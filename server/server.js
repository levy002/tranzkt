const express= require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
require('dotenv').config();
const routes = require('./routes/route');
const { newBudget } = require('./controllers/budgetConteroller');

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use(routes);

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    newBudget()
    app.listen(port);
  })
  .catch((err) => console.log(err));

