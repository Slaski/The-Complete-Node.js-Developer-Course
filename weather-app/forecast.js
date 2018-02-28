const request = require('request');
const keys = require('./keys');

var getForecast = (latitude, longitude, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${keys.forecastKey}/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Forecast servers.');
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
    });
};

module.exports.getForecast = getForecast