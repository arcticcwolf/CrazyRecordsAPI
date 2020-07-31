const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json());

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Crazy Records API. Manage Artist and Albums easy."});
});

require('./app/routes/album.routes.js')(app);
require('./app/routes/artist.routes.js')(app);

// listen for requests
app.listen(3006, () => {
    console.log("Server is listening on port 3006");
});



