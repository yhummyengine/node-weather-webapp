const request = require("request");

const forecast = (lat, lon, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=2360bfd199aee5c9ce8778414507586a&query=' + lat + ',' + lon + '&units=f'

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("unable to connect ");
    // } else if (response.body.error) {
    //   callback("inappropriate latitude");
    } else {
      callback(undefined, 
        "It is currently " + body.current.temperature + " degrees out. The time now is " + body.current.observation_time + " have a great day."
      );
    }
  });
};


module.exports = forecast;
