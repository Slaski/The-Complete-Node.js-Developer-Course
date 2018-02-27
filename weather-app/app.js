const request = require('request');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=rua%20bar%C3%A3o%20de%20campinas%20441',
    json: true
}, (error, response, body) => {
    console.log(body);
});