// NodeJs framework
const express = require('express');
const app = express();
// Library for the MONGO DB
const mongoose = require('mongoose');
// This is for the CRUD to work and hide the DB username and password
const dotenv = require('dotenv');
dotenv.config();
// Importing routes for the API data
const routesUrls = require('./routes/routes');
// Cors is for security
const cors = require('cors');
// connecting the database through mongoose
mongoose.connect(
  process.env.DATABASE_ACCESS,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Database is connected')
);

const https = require('https'),
  helmet = require('helmet'),
  fs = require('fs');

const options = {
  key: fs.readFileSync("/srv/www/keys/my-site-key.pem"),
  cert: fs.readFileSync("/srv/www/keys/chain.pem")
};

// Connectiong Cors for security
app.use(express.json());
app.use(cors());
app.use(helmet()); // Add Helmet as a middleware

// importing routes
app.use('/', routesUrls);
 https.createServer(options, app).listen(443);
//  app.listen(4000, () => console.log('Server is up and running'));
