const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const events = require("./db/events.json");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API.",
  });
});

app.get("/dashboard", verifyToken, (req, res) => {
  jwt.verify(req.token, "the_secret_key", err => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.json({
        events: events,
      });
    }
  });
});

app.post("/register", (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    // In a production app, you'll want to encrypt the password
  };

  const dbUserEmail = require("./db/user.json").email;
  let errorsToSend = [];

  if (user.password.length < 5) {
    errorsToSend.push("Password to short");
  }

  if (user.email === dbUserEmail) {
    errorsToSend.push("An account with this email already exists");
  }

  if (errorsToSend.length === 0) {
    const data = JSON.stringify(user, null, 2);
    fs.writeFile("./db/user.json", data, err => {
      if (err) {
        console.log(err);
      } else {
        const token = jwt.sign({ user }, "the_secret_key");
        // In a production app, you'll want the secret key to be an environment variable
        res.json({
          token,
          email: user.email,
          name: user.name,
        });
      }
    });
  } else {
    return res.status(400).send({ errors: errorsToSend });
  }
});

app.post("/login", (req, res) => {
  const userDB = fs.readFileSync("./db/user.json");
  const userInfo = JSON.parse(userDB);
  if (
    req.body &&
    req.body.email === userInfo.email &&
    req.body.password === userInfo.password
  ) {
    // The secret key should be an environment variable in a live app
    const token = jwt.sign({ userInfo }, "the_secret_key");
    res.json({
      token,
      email: userInfo.email,
      name: userInfo.name,
    });
  } else {
    return res.status(401).send({ error: "Invalid login. Please try again." });
  }
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(401);
  }
}

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
