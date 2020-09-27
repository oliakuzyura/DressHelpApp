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


 
app.get('/', (req, res) => {
    dress.getAll()
    .then(data => console.log(data));
    res
      .status(200)
      .render("index");
  
});

app.post('/', (req, res) => {
  console.log(req.body);
})
 
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listeninghy5rfrct hbujg on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});