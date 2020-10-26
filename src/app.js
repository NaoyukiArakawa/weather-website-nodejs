const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handelebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About This Project',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    text: 'This is our help page. Below you can find each help articles...',
  });
});

app.get('/weather', (req, res) => {
  const queryAddress = req.query.address;

  if (!queryAddress) {
    return res.status(404).send({
      error: 'Address is not provided. You must provide an address.',
    });
  } else {
    geocode(queryAddress, (error, { location, longitude, latitude } = {}) => {
      if (error) {
        return res.status(404).send({ error });
      }
      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.status(404).send({ error });
        }

        res.send({
          forecast: forecastData,
          location: location,
          address: queryAddress,
        });
      });
    });
  }
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search.',
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: 'Error',
    errorText: '😥 Sorry. Help article not found.',
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    title: 'Error',
    errorText: '😥 Page not found.',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
