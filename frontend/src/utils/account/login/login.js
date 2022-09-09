import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";

function Login(props) {
  /* eslint-disable */

  const [firstnameLogIn, setFirstnameLogIn] = useState(null);
  const [lastnameLogIn, setLastnameLogIn] = useState(null);
  const [passwordLogIn, setPasswordLogIn] = useState(null);

  let navigate = useNavigate();
  const LogIn = () => {
    Axios.post("http://localhost:5000/Login", {
      username: firstnameLogIn + " " + lastnameLogIn,
      password: passwordLogIn,
    })
      .then((res) => {
        if (res.data[0].username) {
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log("Something went wrong, please try again...");
        window.location.reload(false);
      });
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (
          firstnameLogIn != "" &&
          lastnameLogIn != "" &&
          passwordLogIn != ""
        ) {
          LogIn();
        } else {
          console.log("Something went wrong, please try again...");
          window.location.reload(false);
        }
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [firstnameLogIn, lastnameLogIn, passwordLogIn]);

  return (
    <div className="signup-background">
      <div className="signup-container">
        <div className="signup-wrapper">
          <h4 className="signup-title" id="login-title">
            Login
          </h4>
          <div className="signup-title-underline"></div>
          <br />
          <label>Firstname</label>
          <input
            type="text"
            placeholder="Firstname..."
            onChange={(e) => {
              setFirstnameLogIn(e.target.value);
            }}
          />
          <label>Lastname</label>
          <input
            type="text"
            placeholder="Lastname..."
            onChange={(e) => {
              setLastnameLogIn(e.target.value);
            }}
          />
          <br />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password..."
            onChange={(e) => {
              setPasswordLogIn(e.target.value);
            }}
          />
          <h4
            className="signup-login-other-option"
            onClick={() => {
              props.showOther(true);
              props.showForm(false);
            }}
          >
            Already have an account?
          </h4>
          <br />
          <button onClick={LogIn} className="signup-btn-confirm">
            Login
          </button>
        </div>
        <div className="login-curves"></div>
      </div>
      <div
        className="close-btn-signup"
        onClick={() => {
          props.showForm(false);
        }}
      >
        <div className="close-btn-signup-line-one"></div>
        <div className="close-btn-signup-line-two"></div>
      </div>
    </div>
  );
}

export default Login;
