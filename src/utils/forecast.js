const request = require('request')

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/56b4dc4814c22de89d2e3e59059b3b37/' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude) + ''

    request({url, json:true}, (error, { body }) => {
        if (error){
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees outside. There is " + (body.currently.precipProbability * 10) + "% chance of rain.")
        }
    })
}


  module.exports = forecast