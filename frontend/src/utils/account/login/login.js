import React from "react";
import { useState } from "react";
import Axios from "axios";
import "./login.css";

function Login(props) {
  const [usernameLogIn, setUsernameLogIn] = useState("");
  const [passwordLogIn, setPasswordLogIn] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const LogIn = () => {
    Axios.post("http://localhost:5000/Login", {
      username: usernameLogIn,
      password: passwordLogIn,
    }).then((res) => {
      console.log(res);

      if (res.data.message) {
        setLoginStatus(res.data.message);
      } else {
        setLoginStatus(res.data[0].username);
      }
    });
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h4 className="login-title">Login</h4>
        <input
          type="text"
          placeholder="Username..."
          onChange={(e) => {
            setUsernameLogIn(e.target.value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Password..."
          onChange={(e) => {
            setPasswordLogIn(e.target.value);
          }}
        />
        <br />
        <button onClick={LogIn} className="login-btn-confirm">
          Login
        </button>
      </div>
      <div className="login-curves"></div>
    </div>
  );
}

export default Login;
