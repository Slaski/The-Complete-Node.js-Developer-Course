const request = require('request');
const yargs = require('yargs');
const key = require('./key.js');

const argv = yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);

request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${key}`,
    json: true
}, (error, response, body) => {
    if (error) {
        console.log('Unable to connect to Google servers.');
    } else if (body.status === 'ZERO_RESULTS') {
        console.log('Unable to find that address.');
    } else if (body.status === 'OK') {
        var result = body.results[0];
        console.log(`Address: ${result.formatted_address}`);
        console.log(`Latitude: ${result.geometry.location.lat}`);
        console.log(`Longitude: ${result.geometry.location.lng}`);
    }
});