const request = require('request');
const keys = require('./keys');

var getForecast = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://api.darksky.net/forecast/${keys.forecastKey}/${latitude},${longitude}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to Forecast servers.');
            } else {
                resolve({
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                });
            }
        });
    });
};

module.exports.getForecast = getForecast