import React from "react";
import { useState } from "react";
import Axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";

function Login(props) {
  /* eslint-disable */
  const [firstnameLogIn, setFirstnameLogIn] = useState("");
  const [lastnameLogIn, setLastnameLogIn] = useState("");
  const [passwordLogIn, setPasswordLogIn] = useState("");

  let navigate = useNavigate();
  const LogIn = () => {
    Axios.post("http://localhost:5000/Login", {
      username: firstnameLogIn + " " + lastnameLogIn,
      password: passwordLogIn,
    }).then((res) => {
      if (res.data[0].username) {
        navigate("/home");
      } else {
        console.log("Something went wrong, please try again...");
        navigate("/");
      }
    });
  };

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
            type="text"
            placeholder="Password..."
            onChange={(e) => {
              setPasswordLogIn(e.target.value);
            }}
          />
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
