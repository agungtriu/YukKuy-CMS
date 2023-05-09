require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.POST || 8080;
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const routes = require("./routes");
app.use(routes);

app.listen(port, () => {
  console.log(`App is listening port ${port}`);
});
