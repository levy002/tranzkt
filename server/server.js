const express= require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
require('dotenv').config();
const routes = require('./routes/route');

const port = process.env.PORT || 5000;

let corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
 }

app.use(cors(corsOptions));
// app.use(cors)
app.use(express.json());

app.use(routes);

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Database connected!");
    app.listen(port);
  })
  .catch((err) => console.log(err));
