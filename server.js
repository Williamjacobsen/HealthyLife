const express = require("express");
const mysql = require("mysql2"); // https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");

const saltRounds = 10; // the time used to encrypt

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    // https://expressjs.com/en/resources/middleware/session.html
    key: "userId",
    secret: "SuperSecret123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24 * 30,
    },
  })
);

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "healthylife",
});

app.post("/SignUp", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO accounts (username, password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

app.get("/LogInGet", (req, res) => {
  if (req.session.user) {
    res.send({
      loggedIn: true,
      user: req.session.user,
    });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/Login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM accounts WHERE username = ?;",
    username, // ffs it's an array
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        // if we found more than 0 objects from db (we find 1 if correct & and zero if wrong)
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ message: "User does not exist!" });
      }
    }
  );
});

app.listen(5000, () => console.log(`Server listening on port 5000...`));
