const request = require("request")

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1IjoicmFtYW5kZWVwOTMiLCJhIjoiY2trdG96ZHBlNDB3MDJ3cXRkczc1ZHB1MCJ9.9uozvx0xYxTYOdRy9VCeRA&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect location service!", undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find result!", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode