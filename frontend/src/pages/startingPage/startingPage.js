import React from "react";
import "./startingPage.css";
import { useState } from "react";
import NavBar from "../../utils/NavBar/NavBar";
import LoginPage from "../../utils/account/login/login";
import SignupPage from "../../utils/account/signup/signup";

function StartingPage() {
  const [loginBtn, setLoginBtn] = useState(null);
  const [signupBtn, setSignupBtn] = useState(null);

  const handleLoginBtnSwitch = (loginBtnSwitch) => {
    setLoginBtn(loginBtnSwitch);
  };

  const handleSignupBtnSwitch = (signupBtnSwitch) => {
    setSignupBtn(signupBtnSwitch);
  };

  return (
    <div className="staringPage-container">
      <div>
        <NavBar pulledFrom={"startingPage"} login={handleLoginBtnSwitch} signup={handleSignupBtnSwitch} />
        {loginBtn ? <LoginPage /> : null}
        {signupBtn ? <SignupPage /> : null}
      </div>
      <div>
        <img
          src={require("../../images/new/logo_transparent_text_dark.png")}
          alt=""
          className="dark-logo-image-startingPage"
        />
        <div className="underline-startingPage"></div>
        <p className="underline-quote">
          "This calorie app is by far the most useful"
        </p>
        <h4 className="underline-info">
          Track Calories
          <br />
          Build-in Calorie Calculator
          <br />
          Track Your Progess!
        </h4>
        <div onClick={handleSignupBtnSwitch} className="underline-signup">
          <h4 className="underline-signup-text">Get Started For Free</h4>
        </div>
        <div>
          <div className="startingPage-circle-inner"></div>
          <div className="startingPage-circle-mid-line"></div>
          <div className="startingPage-circle-outter"></div>
        </div>
      </div>
    </div>
  );
}

export default StartingPage;
