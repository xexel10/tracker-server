require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");
const cors = require('cors');

const app = express();

// 👇️ configure CORS
app.use(cors());
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  next();
});

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const serverPort = process.env.SERVER_PORT;

//const mongoUri = 'mongodb+srv://admin:ctidpf@cluster0.erjkkud.mongodb.net/test'; //No Cloud MONGODB
//const mongoUri = 'mongodb://mongoadmin:secret@mongo:27017/'; //Docker
//const mongoUri = `mongodb://mongoadmin:secret@localhost:27017/`; //Local VS CODE
const mongoUri = `mongodb://mongoadmin:secret@mongo-database:27017`;

if (!mongoUri) {
  throw new Error(
    `MongoURI was not supplied.  Make sure you watch the video on setting up Mongo DB!`
  );
}

mongoose.set("strictQuery", true);
// resolves future deprecation issue with Mongoose v7

mongoose.connect(mongoUri);
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
  console.log(mongoUri);
});
