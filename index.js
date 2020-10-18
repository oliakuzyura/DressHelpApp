const express = require('express');
const bodyParser = require('body-parser');
const busboyBodyParser = require('busboy-body-parser');
const path = require('path');
const mustache = require('mustache-express');
const dress = require('./models/dress');

const app = express();
const Path = path.join(__dirname, 'views');

app.engine('mst', mustache());
app.set('views', Path);
app.set('view engine', 'mst');

app.use(busboyBodyParser());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(__dirname));

app.get('/dress/:weather_id/:temp_max/:temp_min', (req, res) => {
  dress.chooseDressByWeatherIdAndTemperature(req.params.weather_id, req.params.temp_min, req.params.temp_max)
  .then(cloth => {
    res.send(JSON.stringify(cloth));
  });
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/dress', (req, res) => {
  res.render('dress');
})

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listeninghy5rfrct hbujg on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});