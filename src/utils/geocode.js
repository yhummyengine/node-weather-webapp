const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieW9taW95ZTUiLCJhIjoiY2tkYzNuZXkyMHk4dTJ0dDk4bWdnMHJleSJ9.ZAQLC7g06ZDTgVa0bIkNCg&limit=1'

    request({ url, json: true }, (error, { body }) => {
      if (error) {
        callback("unable to connect", undefined);
      } else if (body.features.length === 0) {
        callback("unable to find location", undefined);
      } else {
        callback(undefined, {
          location: body.features[0].place_name,
          latlong: body.features[0].center,
        });
      }
    });

}

module.exports = geocode