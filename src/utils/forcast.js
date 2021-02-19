const request = require("request")

const weatherStack = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6dbeb3b7bcfb82df3e70a53eed272d9e&query=' + latitude + ', ' + longitude;

    request({ url, json: true }, (error, { body, error: responseError }) => {
        if (responseError) {
            callback("Unable to connect weather stack service!", undefined)
        } else if (error) {
            callback("Unable to find result!", undefined)
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions[0] + '! It is currently ' + body.current.temperature + ' degress out. It feelslike ' + body.current.feelslike + ' degress.' + ' The humidity is ' + body.current.humidity + ' percent.',
            })
        }
    })
}

module.exports = weatherStack