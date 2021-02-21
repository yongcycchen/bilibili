require("./dotenv");

const express = require("express");
const bodyParser = require("body-parser");
const crossDomain = require("./middleware/cross-domain");
const routers = require("./routers");

const app = express();

if (process.env.NODE_ENV!=="production"){
    app.use(express.static("./"));
}

app.use(bodyParser.json());

app.use(crossDomain);

app.use(routers);

// Error handling
app.use(function (err, req, res, next) {
    logger.error(err.stack);
    res.status(500).send({
      code: "-1",
      msg: err.stack
    });
  });

const port = 3011;
/* eslint-disable no-console */
app.listen(port, () => {
    console.log("Your server is running at port " + port);
  });
  