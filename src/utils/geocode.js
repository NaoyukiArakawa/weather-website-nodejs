const request = require('postman-request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoiaGVsbG9kZXNpZ24taW8iLCJhIjoiY2tnN3c5cWYwMDdwbDJxbzNmdXVlNGV5YSJ9.9N3XKBZZvK0zeGrK4OEbLA';

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to location services', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search', undefined);
    } else {
      callback(undefined, {
        location: body.features[0].place_name,
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
      });
    }
  });
};

module.exports = geocode;
