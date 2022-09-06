import React from "react";
import { useState, useEffect } from "react";
import "./NavBar.css";

function NavBar(props) {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1200);
  const [isSmallDesktop, setSmallDesktop] = useState(window.innerWidth > 900);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1200);
    setSmallDesktop(window.innerWidth > 900);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const handleLoginBtnSwitch = () => {
    props.login(true);
  };

  const handleSignupBtnSwitch = () => {
    props.signup(true);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-logo-wrapper">
        {isSmallDesktop ? (
          <div>
            <img
              src={require("../../images/new/logo_transparent (2).png")}
              alt=""
              className="navbar-logo-img"
            />
            <img
              src={require("../../images/new/logo_transparent_text.png")}
              alt=""
              className="navbar-logo-text"
            />
          </div>
        ) : null}
      </div>
      {props.pulledFrom === "startingPage" ? (
        <div className="navbar-options-warpper">
          <div className="btn-background-acc"></div>
          <div className="btn-background-acc-linebreak"></div>
          {isDesktop ? (
            <h4 className="sign-up-btn" onClick={handleSignupBtnSwitch}>
              Get Started For Free
            </h4>
          ) : (
            <h4 className="sign-up-btn" onClick={handleSignupBtnSwitch}>
              Sign Up
            </h4>
          )}
          <h4 className="login-btn" onClick={handleLoginBtnSwitch}>
            Login
          </h4>
        </div>
      ) : props.pulledFrom === "home" ? (
        <div className="navbar-options-warpper">
          <div className="btn-background-acc"></div>
          <div className="btn-background-acc-linebreak"></div>
        </div>
      ) : (
        <div className="navbar-options-warpper">
          <div className="btn-background-navbar"></div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
