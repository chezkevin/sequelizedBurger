/*********************
Dependencies
*********************/

var express = require('express');
var exprhbs = require('express-handlebars');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

/*********************
End dependencies
*********************/

// creates an instance of the express function
var app = express();

// setting the env variable allows this to be deployed easily to Heroku
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));

/*********************
uses handlebars to display
*********************/

// creates a new engine. The handlebars files live in the app/view/layouts folder
app.engine('handlebars',exprhbs({defaultLayout: 'main'}));
// tells us to use the handlebars engine
app.set('view engine','handlebars');

// require routing functions from burger_controller.js
require('./controllers/burgers_controller.js')(app);
