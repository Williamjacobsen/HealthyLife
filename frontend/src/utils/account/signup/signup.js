import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./signup.css";

function Signup(props) {
  /* eslint-disable */

  const [FirstnameSignUp, setFirstnameSignUp] = useState("");
  const [LastnameSignUp, setLastnameSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");

  const [age, setAge] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [gender, setGender] = useState("m");
  const [activity, setActivity] = useState("Activity level...");
  const [goal, setGoal] = useState("Goal...");

  const [signupPage, setSignupPage] = useState(0);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showGoalDropdown, setShowGoalDropdown] = useState(false);

  const [loginStatus, setLoginStatus] = useState("");

  const handleSignup = () => {
    Axios.post("http://localhost:5000/SignUp", {
      username: FirstnameSignUp + " " + LastnameSignUp,
      password: passwordSignUp,
      age: age,
      gender: gender,
      height: height,
      weight: weight,
      activity: activity,
      goal: goal,
    })
      .then((res) => {
        const calories = res.data.calorie;
        const goalCalories = res.data.goal;
        console.log("Succesfully created account...");
      })
      .catch((err) => {
        console.error(err);
      })
      .then(() => {
        Axios.post("http://localhost:5000/Login", {
          username: FirstnameSignUp + " " + LastnameSignUp,
          password: passwordSignUp,
        }).then((res) => {
          if (res.data[0].username) {
            navigate("/home");
          } else {
            console.log("Something went wrong, please try again...");
            window.location.reload(false);
          }
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  let navigate = useNavigate();
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (
          signupPage == 0 &&
          FirstnameSignUp != "" &&
          LastnameSignUp != "" &&
          passwordSignUp != ""
        ) {
          setSignupPage(1);
        } else if (
          signupPage == 1 &&
          age >= 15 &&
          age <= 80 &&
          height != 0 &&
          weight != 0 &&
          activity != "Activity level..." &&
          goal != "Goal..."
        ) {
          handleSignup();
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
  }, [
    FirstnameSignUp,
    LastnameSignUp,
    passwordSignUp,
    age,
    gender,
    height,
    weight,
    activity,
  ]);

  const showSignupPageState = () => {
    if (signupPage === 0) {
      return (
        <>
          <label>Firstname</label>
          <input
            type="text"
            placeholder="Firstname..."
            onChange={(e) => {
              setFirstnameSignUp(e.target.value);
            }}
          />
          <label>Lastname</label>
          <input
            type="text"
            placeholder="Lastname..."
            onChange={(e) => {
              setLastnameSignUp(e.target.value);
            }}
          />
          <br />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password..."
            onChange={(e) => {
              setPasswordSignUp(e.target.value);
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
          <div
            onClick={() => {
              if (
                FirstnameSignUp != "" &&
                LastnameSignUp != "" &&
                passwordSignUp != ""
              ) {
                setSignupPage(1);
              }
            }}
            className="continue-cirkle"
          >
            <div className="continue-cirkle-arrow-middle"></div>
            <div className="continue-cirkle-arrow-1"></div>
            <div className="continue-cirkle-arrow-2"></div>
            <div className="continue-cirkle-hover-flash"></div>
          </div>
        </>
      );
    } else if (signupPage === 1) {
      return (
        <>
          <div>
            <div className="signup-option-one">
              <label>Age (15 - 80)</label>
              <input
                type="text"
                placeholder="Age..."
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
              <label>Height</label>
              <input
                type="text"
                placeholder="Height..."
                onChange={(e) => {
                  setHeight(e.target.value);
                }}
              />
              <label>Weight</label>
              <input
                type="text"
                placeholder="Weight..."
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
              />
            </div>
            <div className="signup-option-two">
              <label>Gender</label>
              {(() => {
                if (gender === "m") {
                  return (
                    <>
                      <div
                        className="Gender-Checkbox"
                        id="one"
                        style={{
                          background:
                            "linear-gradient(135deg,#729D39, #729D39,#729D39,#729D39, #729D39,#729D39, #C6E377,#C6E377,#C6E377,#C6E377,#C6E377,#C6E377)",
                        }}
                      >
                        <p className="Gender-Paragraf-male">Male</p>
                        <div
                          onClick={() => {
                            setGender("f");
                          }}
                          className="Gender-Paragraf-male-box"
                        ></div>
                        <p className="Gender-Paragraf-female">Female</p>
                        <img
                          src={require("../../../images/checkThin.png")}
                          alt=""
                          className="Gender-Checkbox-Male"
                        />
                      </div>
                    </>
                  );
                } else {
                  return (
                    <>
                      <div
                        className="Gender-Checkbox"
                        id="one"
                        style={{
                          background:
                            "linear-gradient(-45deg,#729D39, #729D39,#729D39,#729D39, #729D39,#729D39, #C6E377,#C6E377,#C6E377,#C6E377,#C6E377,#C6E377)",
                        }}
                      >
                        <p className="Gender-Paragraf-male">Male</p>
                        <div
                          onClick={() => {
                            setGender("m");
                          }}
                          className="Gender-Paragraf-female-box"
                        ></div>
                        <p className="Gender-Paragraf-female">Female</p>
                        <img
                          src={require("../../../images/checkThin.png")}
                          alt=""
                          className="Gender-Checkbox-Female"
                        />
                      </div>
                    </>
                  );
                }
              })()}
              <label
                style={{
                  position: "relative",
                  top: "-10px",
                }}
              >
                Activity
              </label>
              <img
                className="dropdown-icon"
                src={require("../../../images/dropdown.png")}
                alt=""
                style={{ transform: showDropdown ? "rotate(180deg)" : null }}
              />
              <div className="Dropdown-container">
                <div
                  onClick={() => {
                    setShowDropdown((prev) => !prev);
                  }}
                  className="Dropdown-origin"
                >
                  <p>{activity}</p>
                </div>
                <div
                  style={{
                    opacity: showDropdown ? "1" : "0",
                  }}
                  className="Dropdown-menu"
                >
                  <p
                    onClick={() => {
                      setActivity("Sedentary: little or no exercise");
                      setShowDropdown((prev) => !prev);
                    }}
                  >
                    <b>Sedentary:</b> little or no exercise
                  </p>
                  <p
                    onClick={() => {
                      setActivity("Light: exercise 1-3 times/week");
                      setShowDropdown((prev) => !prev);
                    }}
                  >
                    <b>Light</b>: exercise 1-3 times/week
                  </p>
                  <p
                    onClick={() => {
                      setActivity(
                        "Active: daily exercise or intense exercise 3-4 times/week"
                      );
                      setShowDropdown((prev) => !prev);
                    }}
                  >
                    <b>Active:</b> daily exercise or intense exercise 3-4
                    times/week
                  </p>
                  <p
                    onClick={() => {
                      setActivity(
                        "Very Active: intense exercise 6-7 times/week"
                      );
                      setShowDropdown((prev) => !prev);
                    }}
                  >
                    <b>Very Active:</b> intense exercise 6-7 times/week
                  </p>
                  <p
                    onClick={() => {
                      setActivity(
                        "Extra Active: very intense exercise daily, or physical job"
                      );
                      setShowDropdown((prev) => !prev);
                    }}
                  >
                    <b>Extra Active:</b> very intense exercise daily, or
                    physical job
                  </p>
                </div>
              </div>
              {showDropdown ? (
                <div
                  className="goal-container-hide"
                  onClick={() => {
                    setShowGoalDropdown(false);
                    setShowDropdown(false);
                  }}
                >
                  <label>Weight Goal</label>
                  <img
                    className="dropdown-icon-goal"
                    src={require("../../../images/dropdown.png")}
                    alt=""
                    //style={{ transform: showDropdown ? "rotate(180deg)" : null }}
                  />
                  <div className="goal-dropdown-container">
                    <p>{goal}</p>
                  </div>
                </div>
              ) : (
                <div
                  className="goal-container-show"
                  onClick={() => {
                    setShowGoalDropdown((prev) => !prev);
                    setShowDropdown(false);
                  }}
                >
                  <label>Weight Goal</label>
                  <img
                    className="dropdown-icon-goal"
                    src={require("../../../images/dropdown.png")}
                    alt=""
                    style={{
                      transform: showGoalDropdown ? "rotate(180deg)" : null,
                    }}
                  />
                  <div
                    className="goal-dropdown-container"
                    style={{ height: showGoalDropdown ? "auto" : "50px" }}
                  >
                    <p>{goal}</p>
                    <div
                      className="goal-dropdown-menu"
                      style={{ opacity: showGoalDropdown ? "1" : "0" }}
                    >
                      <p
                        onClick={() => {
                          setGoal("Heavy Weight Gain");
                        }}
                      >
                        Heavy Weight <b>Gain</b>
                      </p>
                      <p
                        onClick={() => {
                          setGoal("Slight Weight Gain");
                        }}
                      >
                        Slight Weight <b>Gain</b>
                      </p>
                      <p
                        onClick={() => {
                          setGoal("Maintain Weight");
                        }}
                      >
                        Maintain Weight
                      </p>
                      <p
                        onClick={() => {
                          setGoal("Slight Weight Loss");
                        }}
                      >
                        Slight Weight <b>Loss</b>
                      </p>
                      <p
                        onClick={() => {
                          setGoal("Heavy Weight Loss");
                        }}
                      >
                        Heavy Weight <b>Loss</b>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {signupPage == 1 &&
            age >= 15 &&
            age <= 80 &&
            height != 0 &&
            weight != 0 &&
            activity != "Activity level..." &&
            goal != "Goal..." ? (
              <button
                onClick={() => {
                  if (
                    signupPage == 1 &&
                    FirstnameSignUp != "" &&
                    LastnameSignUp != "" &&
                    passwordSignUp != "" &&
                    age >= 15 &&
                    age <= 80 &&
                    height != 0 &&
                    weight != 0 &&
                    activity != "Activity level..." &&
                    goal != "Goal..."
                  ) {
                    handleSignup();
                  }
                }}
                className="signup-btn-confirm"
              >
                Sign Up
              </button>
            ) : (
              <></>
            )}
          </div>
        </>
      );
    }
  };

  return (
    <div className="signup-background">
      <div className="signup-container">
        <div className="signup-wrapper">
          <h4 className="signup-title">Create New Account</h4>
          <div className="signup-title-underline"></div>
          {showSignupPageState()}
          <div
            className="close-btn-signup"
            onClick={() => {
              props.showForm(false);
            }}
            style={{ marginTop: "-50px", marginRight: "-400px" }}
          >
            <div className="close-btn-signup-line-one"></div>
            <div className="close-btn-signup-line-two"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
