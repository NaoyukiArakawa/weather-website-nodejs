const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=0540e188eeb48a103a471cfed850bf54&query=' +
    encodeURIComponent(latitude) +
    ',' +
    encodeURIComponent(longitude);

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. There is a ${body.current.precip}% chance of rain. Humidity is ${body.current.humidity}%.`
      );
    }
  });
};

module.exports = forecast;
