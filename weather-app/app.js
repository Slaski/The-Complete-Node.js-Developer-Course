const request = require('request');
const key = require('./key.js');

request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=rua%20bar%C3%A3o%20de%20campinas%20441&key=${key}`,
    json: true
}, (error, response, body) => {
    var result = body.results[0];
    console.log(`Address: ${result.formatted_address}`);
    console.log(`Latitude: ${result.geometry.location.lat}`);
    console.log(`Longitude: ${result.geometry.location.lng}`);
});