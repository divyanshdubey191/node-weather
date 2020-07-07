const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/eb5d2455b3f9b95a320af49382e3ce94/' + lat + ',' + long + '?units=si'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to Weather service', undefined)
        }
        else if(body.error)
        {
            callback('Unable to find location', undefined)
        }
        else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out'+' There is a ' + body.currently.precipProbability + '% chance of rain. Humidity: '+ body.currently.humidity + ' Wind speed: ' + body.currently.windSpeed)
        }
    })
}

module.exports = forecast