const path = require("path");
const express = require("express");
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express();
//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// set-up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set-up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "yomi oye",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "yomi oye",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help-note",
    name: "yomi oye",
    helpText: "This is some helpful text."
  });
});
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Kindly provide an address"
    })
  }
  geocode(req.query.address, (error, {location, latlong }={}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(location, latlong, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });


//   console.log(req.query.address)
  // res.send({
  //   forecast: "It is snowing",
  //   location: "philadephia",
  //   address: req.query.address
  // });
});

app.get('/products', (req,res) => {
  res.send({
    products: {}
  })
})


app.get('/help/*', (req, res) => {
    res.render('404Classwork', {
        title: '404',
        name: 'yomi oye',
        errorMessage: 'Help article not found.'
    })
})

app.get("*", (req, res) => {
  res.render('404Classwork', {
      title: '404',
      name: 'yomi oye',
      errorMessage: 'page not found'
  })
});



app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
