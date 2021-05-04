var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var logger = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const helmet = require("helmet");
const passport = require("passport");
var app = express();
var port = process.env.PORT || 5000;

// Passport middleware
app.use(passport.initialize());
// Passport Config
require("./config/passport")(passport);

app.use(cors());
// Body parser middleware
app.use(bodyParser.urlencoded({ limit: "1000mb", extended: true }));
app.use(bodyParser.json({ limit: "1000mb", extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
} else {
  app.use(logger("dev"));
}

app.use(cors());
app.use((req, res, next) => {
  res.header("X-XSS-Protection", 0);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const mongoURI = require("./config/keys").mongoURI;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

var current_version = "v1";

var Users = require(`./routes/${current_version}/users`);
var Country = require(`./routes/${current_version}/country`);
var City = require(`./routes/${current_version}/city`);
var District = require(`./routes/${current_version}/district`);
var Nationalities = require(`./routes/${current_version}/nationalities`);
var field = require(`./routes/${current_version}/field`);
var game = require(`./routes/${current_version}/game`);
var play = require(`./routes/${current_version}/play`);
var special = require(`./routes/${current_version}/special`);
var ad = require(`./routes/${current_version}/ad`);
var service = require(`./routes/${current_version}/service`);
var district = require(`./routes/${current_version}/district`);
var stadium = require(`./routes/${current_version}/stadium`);
var video = require(`./routes/${current_version}/video`);
var page = require(`./routes/${current_version}/page`);
var permission = require(`./routes/${current_version}/permission`);

app.use(`/api/${current_version}/users`, Users);
app.use(`/api/${current_version}/country`, Country);
app.use(`/api/${current_version}/city`, City);
app.use(`/api/${current_version}/district`, District);
app.use(`/api/${current_version}/nationality`, Nationalities);
app.use(`/api/${current_version}/field`, field);
app.use(`/api/${current_version}/game`, game);
app.use(`/api/${current_version}/play`, play);
app.use(`/api/${current_version}/special`, special);
app.use(`/api/${current_version}/ad`, ad);
app.use(`/api/${current_version}/service`, service);
app.use(`/api/${current_version}/district`, district);
app.use(`/api/${current_version}/stadium`, stadium);
app.use(`/api/${current_version}/video`, video);
app.use(`/api/${current_version}/page`, page);
app.use(`/api/${current_version}/permission`, permission);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
