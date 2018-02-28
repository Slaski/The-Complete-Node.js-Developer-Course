const yargs = require('yargs');
const geocode = require('./geocode');
const forecast = require('./forecast');

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

geocode.geocodeAddress(argv.address)
    .then(result => {
        console.log(result.address);
        return forecast.getForecast(result.latitude, result.longitude);
    })
    .then(result => {
        console.log(`It's currently ${result.temperature}. It feels like ${result.apparentTemperature}.`);
    })
    .catch(errorMessage => {
        console.log(errorMessage);
    });