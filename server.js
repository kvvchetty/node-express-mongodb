const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//var corsOptions = {
//  origin: "http://localhost:8081"
//  origin: "https://agcurdappxk01.herokuapp.com"
//};

//app.use(cors(corsOptions));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://agcurdappxk01.herokuapp.com');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});




// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get("/hello", function(req, res) {

    // ejs render automatically looks in the views folder
    res.render('index');
});
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to node-express application." });
});

require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
