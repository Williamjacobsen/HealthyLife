const express = require("express");
const mysql = require("mysql2"); // https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { getCalorieData } = require("./utils/getCalorieAPI");

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

app.post("/SignUp", async (req, res) => {
  /*
  cage = age = int (1, 2, 3)
  csex = gender = m (male) / f (female)
  cheightmeter = height = int (1, 2, 3)
  ckg = weight = int (1, 2, 3)
  cactivity = activity = float (1.234, 2.345, 3.456) => {
      Sedentary = 1.2
      Light = 1.375
      Moderate = 1.465
      Active = 1.55
      Very Active = 1.725
      Extra Active = 1.9
  }
  */
  let activity = 0.0;
  if (req.body.activity === "Sedentary: little or no exercise") {
    activity = 1.2;
  } else if (req.body.activity === "Light: exercise 1-3 times/week") {
    activity = 1.375;
  } else if (
    req.body.activity ===
    "Active: daily exercise or intense exercise 3-4 times/week"
  ) {
    activity = 1.55;
  } else if (
    req.body.activity === "Very Active: intense exercise 6-7 times/week"
  ) {
    activity = 1.725;
  } else if (
    req.body.activity ===
    "Extra Active: very intense exercise daily, or physical job"
  ) {
    activity = 1.9;
  }
  const calories = await getCalorieData(
    req.body.age,
    req.body.gender,
    req.body.height,
    req.body.weight,
    activity
  );

  if (!calories) {
    res.send({ msg: "Calorie error..." });
  }

  var goalCalories = calories.replace(/\,/g, "");
  goalCalories = Number(goalCalories);
  if (req.body.goal === "Heavy Weight Gain") {
    goalCalories += 500;
  } else if (req.body.goal === "Slight Weight Gain") {
    goalCalories += 250;
  } else if (req.body.goal === "slight Weight Loss") {
    goalCalories -= 250;
  } else if (req.body.goal === "Heavy Weight Loss") {
    goalCalories -= 500;
  }

  if (goalCalories === NaN) {
    res.send({ msg: "Calorie goal error..." });
  }

  // create new account (username, password, calories)
  bcrypt.hash(req.body.password, saltRounds, (err, hashedPwd) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO accounts (username, password, calories, goal) VALUES (?,?,?,?)",
      [
        req.body.username,
        hashedPwd,
        calories,
        req.body.goal + ": " + goalCalories,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          res.send({ msg: "An error occurred" });
        } else {
          console.log(
            `Succesfully created account - USERNAME : {${req.body.username}}...`
          );
          res.send({
            calorie: calories,
            goal: req.body.goal + ": " + goalCalories,
          });
        }
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

app.post("/updatePoints", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const points = req.body.points;

  if (username == null || password == null) {
    res.send({ message: "Account info null..." });
  }

  db.query(
    "SELECT * FROM accounts WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        if (
          result[0].username === username &&
          result[0].password === password
        ) {
          db.query(
            "UPDATE accounts SET points = ? WHERE username = ?",
            [points, username],
            (err, result) => {
              res.send({ points: points, err: err, result: result });
            }
          );
        } else {
          res.send({ message: "Wrong username/password combination!" });
        }
      } else {
        res.send({ message: "User does not exist!" });
      }
    }
  );
});

app.get("/foods", (req, res) => {
  db.query("SELECT * FROM foods", (err, result) => {
    // omfg "SELCET" !== "SELECT"
    if (err) {
      res.send({ err: err });
    }
    res.send({ foods: result });
  });
});

app.listen(5000, () => console.log(`Server listening on port 5000...`));
