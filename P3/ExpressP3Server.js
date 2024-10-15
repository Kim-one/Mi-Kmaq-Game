// start the Express framework and make it accessible via the reference
const express = require("express");
// define the top level Express function
const server = express();
// set the port where the server listens for clients
const port = 3026;
let correctAns = 0;
let totalA = 0;

// enable the server to recognize JSON format
server.use(express.json());

// enable incoming "name":"value" pairs to be any type including arrays
server.use(express.urlencoded({ extended: true }));

const allowCrossDomain = function (req, res, next) {
  // allow any origin
  res.header("Access-Control-Allow-Origin", "*");
  // allow any method
  res.header("Access-Control-Allow-Methods", "GET,POST");
  // accept only headers with Content-Type included
  res.header("Access-Control-Allow-Headers", "Content-Type");
  // since this middleware function does not terminate the request/response cycle
  // the next() function must be called to continue to the succeeding middleware function
  next();
};

// set domain characteristics defined above
server.use(allowCrossDomain);

server.post("/myPost", function (req, res) {
  correctAns = req.body.score;
  totalA = req.body.total;
  console.log(correctAns);
  console.log(req.body.total);

  let obj = { status: "Done" };

  return res.status(200).send(obj);
});

server.get("/myGet", function (req, res) {
  let obj = { score: correctAns, total: totalA };

  return res.status(200).send(obj);
});

server.listen(port, function () {
  console.log("Listening on port 3026");
});
