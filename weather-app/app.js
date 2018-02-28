const yargs = require('yargs');
const axios = require('axios');
const keys = require('./keys');

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
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${keys.geocodeKey}`;

axios.get(geocodeUrl)
    .then(response => {
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that address.');
        }
        
        console.log(response.data.results[0].formatted_address);

        var latitude = response.data.results[0].geometry.location.lat;
        var longitude = response.data.results[0].geometry.location.lng;
        var forecastUrl = `https://api.darksky.net/forecast/${keys.forecastKey}/${latitude},${longitude}`

        return axios.get(forecastUrl);
    })
    .then(response => {
        var temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;

        console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
    })
    .catch(error => {
        if (error.code === 'ENOTFOUND') {
            console.log('Unable to connnect to Google servers.');
        } else {
            console.log(error);
        }
    });