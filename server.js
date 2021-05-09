var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var logger = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const helmet = require("helmet");
const passport = require("passport");
var app = express();

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 5000;

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
var permission = require(`./routes/${current_version}/permission`);

app.use(`/api/${current_version}/users`, Users);
app.use(`/api/${current_version}/country`, Country);
app.use(`/api/${current_version}/city`, City);
app.use(`/api/${current_version}/district`, District);
app.use(`/api/${current_version}/permission`, permission);

var brand = require(`./routes/${current_version}/brand`);
app.use(`/api/${current_version}/brand`, brand);
var model = require(`./routes/${current_version}/model`);
app.use(`/api/${current_version}/model`, model);

var service = require(`./routes/${current_version}/service`);
app.use(`/api/${current_version}/service`, service);
var subservice = require(`./routes/${current_version}/subservice`);
app.use(`/api/${current_version}/subservice`, subservice);

var category = require(`./routes/${current_version}/category`);
app.use(`/api/${current_version}/category`, category);
var subcategory = require(`./routes/${current_version}/subcategory`);
app.use(`/api/${current_version}/subcategory`, subcategory);

var page = require(`./routes/${current_version}/page`);
app.use(`/api/${current_version}/page`, page);

var color = require(`./routes/${current_version}/color`);
app.use(`/api/${current_version}/color`, color);

var company = require(`./routes/${current_version}/company`);
app.use(`/api/${current_version}/company`, company);

var upload = require(`./routes/${current_version}/upload`);
app.use(`/api/${current_version}/upload`, upload);

var product = require(`./routes/${current_version}/product`);
app.use(`/api/${current_version}/product`, product);

var upload = require(`./routes/${current_version}/upload`);
app.use(`/api/${current_version}/upload`, upload);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
