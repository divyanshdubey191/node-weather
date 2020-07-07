const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//const { dirname } = require('path')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Divyansh Dubey"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Divyansh Dubey"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: "Please don't disturb even if you need help...Thanks",
        name: "Divyansh Dubey"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an Address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                address: req.query.address,
                location,
                forecast: forecastdata
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    console.log(req.query.search)
    res.send([{
        name: 'Pen',
        rating: '4'
    }])
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Help',
        errormsg: "Help Article not found",
        name: "Divyansh Dubey"
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404 Error',
        errormsg: "Page not found",
        name: "Divyansh Dubey"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})