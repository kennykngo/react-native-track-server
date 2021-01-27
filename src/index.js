require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
// associates all of the request handlers we added to the router
app.use(authRoutes);

const mongoUri =
  "mongodb+srv://admin:passwordpassword@cluster0.ztqq1.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to mongo", err);
});

// requireAuth - middleware

// EVERYTIME someone makes a get type HTTP request
// function gets called automatically
/**
 * @param req - {object} INCOMING request
 * @param res - {object} OUTGOING response
 */
app.get("/", requireAuth, (req, res) => {
  // App will send out hi there
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
