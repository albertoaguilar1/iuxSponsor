// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
let app = express();

// Import routes
let apiRoutes = require('./api-routes');
let swaggerUi = require('swagger-ui-express');
let swaggerDocument = require('./swagger.json');
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable

//mongoose.connect('mongodb://localhost:27017/museum_db', { useNewUrlParser: true});
var mongo_host = (process.env.MONGO_SERVICE_HOST || 'localhost' );
var mongo_port = (process.env.MONGO_SERVICE_PORT || 27017 );
var url = 'mongodb://'+mongo_host+':'+mongo_port+'/museum_db';

mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true})
    .then(() => console.log("Connected to Database"))
    .catch(err => console.error("Error connecting db", err));

var db = mongoose.connection;

// Setup server port
var port = process.env.PORT || 8083;

// Send message for default URL
app.use('/api-docs/sponsors', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => res.send('Hello World with Express Sponsor'));

// Use Api routes in the App

app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("* Running exacta_Server on port " + port);
});
