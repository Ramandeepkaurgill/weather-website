const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewDirectory = path.join(__dirname, '../templates/views')
const partialsDirectoy = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewDirectory)
hbs.registerPartials(partialsDirectoy)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ramandeep Kaur'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ramandeep Kaur'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'For any help contact with us',
        name: 'Ramandeep Kaur'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'The address must be provided'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, place } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forcast(latitude, longitude, (error, { description }) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            return res.send({
                forcast: description,
                location: place,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found',
        name: 'Ramandeep Kaur'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'My 404 page',
        name: 'Ramandeep Kaur'
    })
})

app.listen(PORT, () => {
    console.log('server started at port' + PORT)
})