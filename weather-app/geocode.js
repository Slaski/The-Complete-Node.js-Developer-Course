const request = require('request');
const keys = require('./keys');

var geocodeAddress = (address) => {
    var encodedAddress = encodeURIComponent(address);
    return new Promise((resolve, reject) => {
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${keys.geocodeKey}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to Google servers');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address');
            } else if (body.status === 'OK') {
                var result = body.results[0];
                resolve({
                    address: result.formatted_address,
                    latitude: result.geometry.location.lat,
                    longitude: result.geometry.location.lng
                })
            }
        });
    });
};

module.exports.geocodeAddress = geocodeAddress;