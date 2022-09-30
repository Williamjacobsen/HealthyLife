import React from "react";
import NavBar from "./../../utils/NavBar/NavBar";
import { useState, useEffect } from "react";
import Axios from "axios";
import "./Home.css";

function Home() {
  /* eslint-disable */
  Axios.defaults.withCredentials = true;

  const [isDesktop, setDesktop] = useState(window.innerWidth > 1200);
  const updateMedia = () => {
    setDesktop(window.innerWidth > 1200);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const [navBarButtonPressed, setNavBarButtonPressed] = useState(null);
  const [navbarTabsPressed, setNavbarTabsPressed] = useState("Calorie Tracker");
  const [sidebarTabsPressed, setSidebarTabsPressed] =
    useState("Calorie Tracker");

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [calories, setCaloires] = useState("");
  const [goal, setGoal] = useState(0);
  const [points, setPoints] = useState(0);

  const [addMeal, setAddMeal] = useState("");
  const [Breakfast, setBreakfast] = useState([]);
  const [Lunch, setLunch] = useState([]);
  const [Dinner, setDinner] = useState([]);
  const [Snacks, setSnacks] = useState([]);
  const [search, setSearch] = useState("");

  const [showBreakfast, setShowBreakfast] = useState(false);
  const [showLunch, setShowLunch] = useState(false);
  const [showDinner, setShowDinner] = useState(false);
  const [showSnacks, setShowSnacks] = useState(false);

  const [showFoodInfo, setShowFoodInfo] = useState(null);
  const [foods, setFoods] = useState(null);

  const handleNavbarBtn = (handleNavbarBtn) => {
    setNavBarButtonPressed(handleNavbarBtn);
  };

  useEffect(() => {
    // remove false
    if (username !== null && password !== null && false) {
      console.log(
        "Account: " +
          username +
          ", password: " +
          password +
          ", points: " +
          points +
          ", calories: " +
          calories +
          ", goal: " +
          goal
      );
    }
  }, [username]); // omfg, i put the [] outside wtfffffff

  useEffect(() => {
    Axios.get("http://localhost:5000/LogInGet").then((response) => {
      setUsername(response.data.user[0].username);
      setPassword(response.data.user[0].password);
      setCaloires(response.data.user[0].calories);
      setGoal(response.data.user[0].goal);
      setPoints(response.data.user[0].points);
    });
  }, []);

  useEffect(() => {
    // console.log(navbarTabsPressed);
  }, [navbarTabsPressed]);

  const updatePoints = () => {
    if (username !== null && password !== null) {
      Axios.post("http://localhost:5000/updatePoints", {
        username: username,
        password: password,
        points: points,
      }).then((res) => {
        console.log("updatePoints : ");
        console.log(res);
        setPoints(res.data.points);
      });
    }
  };

  useEffect(() => {
    Axios.get("http://localhost:5000/foods").then((res) => {
      setFoods(res.data.foods);
    });
  }, []);

  useEffect(() => {
    setShowBreakfast(false);
    setShowLunch(false);
    setShowDinner(false);
    setShowSnacks(false);
  }, []);

  const sidebarTabs = (title, active, id) => {
    return (
      <>
        <div
          className="sidebar-tabs-container"
          style={{
            top: id * 120 + 130 + "px",
            backgroundColor: active ? "#c6e377" : "#c6e37750",
          }}
          onClick={() => {
            setSidebarTabsPressed(title);
            setNavbarTabsPressed(title);
          }}
        >
          <h4>{title}</h4>
        </div>
      </>
    );
  };

  const sidebar = () => {
    const tabs = ["Calorie Tracker", "Progress", "Account", "Contact Us"];
    return (
      <>
        <div className="sidebar-container">
          <div className="sidebar-account">
            <div className="sidebar-account-icon"></div>
            <div className="sidebar-center-account">
              <h4>{username}</h4>
            </div>
            <div className="sidebar-center-account">
              <p>Total Points: {points}</p>
            </div>
          </div>
          <div className="sidebar-tabs">
            {sidebarTabs(tabs[0], sidebarTabsPressed === tabs[0], 1)}
            {sidebarTabs(tabs[1], sidebarTabsPressed === tabs[1], 2)}
            {sidebarTabs(tabs[2], sidebarTabsPressed === tabs[2], 3)}
            {sidebarTabs(tabs[3], sidebarTabsPressed === tabs[3], 4)}
          </div>
        </div>
        <div>
          {sidebarTabsPressed === tabs[0] ? CaloriesTracker() : null}
          {sidebarTabsPressed === tabs[1] ? Progress() : null}
          {sidebarTabsPressed === tabs[2] ? Account() : null}
          {sidebarTabsPressed === tabs[3] ? ContactUs() : null}
        </div>
      </>
    );
  };

  const pageNavbarTabs = (title, active) => {
    return (
      <>
        <div
          className="navbar-tabs-container"
          style={{ backgroundColor: active ? "#c6e377" : "#c6e37750" }}
          onClick={() => {
            setNavbarTabsPressed(title);
          }}
        >
          <h4>{title}</h4>
        </div>
      </>
    );
  };

  const [term, setTerm] = useState("");
  function searchingFor(term) {
    // ty google :)
    return function (x) {
      return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
    };
  }

  const searchBar = (meal) => {
    var counter = 0;
    return (
      <div className="CalorieTracker-add-foods-container">
        <div className="CalorieTracker-add-foods">
          <h4>Search</h4>
          <p>Add new foods to your diet by searching</p>
          <input
            style={{ height: "50px", position: "absolute", top: "150px" }}
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              setSearch(e.target.value);
              setTerm(e.target.value);
            }}
          />
          <img
            src={require("../../images/loupe.png")}
            alt=""
            style={{
              width: "30px",
              height: "30px",
              position: "absolute",
              top: "170px",
              right: "125px",
            }}
          />
          <div
            className="close-btn-signup"
            onClick={() => {
              setAddMeal("");
            }}
          >
            <div className="close-btn-signup-line-one"></div>
            <div className="close-btn-signup-line-two"></div>
          </div>
          {search != "" && foods != null
            ? foods.filter(searchingFor(term)).map((data) => (
                <div
                  key={data.idfoods}
                  style={{
                    position: "absolute",
                    top: 225 + counter + "px",
                  }}
                >
                  <h1
                    style={{
                      position: "absolute",
                      zIndex: -1,
                      opacity: 0,
                    }}
                  >
                    {(counter += 50)}
                  </h1>
                  <h1 style={{ fontWeight: 400 }}>{data.name}</h1>
                  <img
                    src={require("../../images/add.png")}
                    alt=""
                    style={{
                      width: "40px",
                      height: "40px",
                      position: "absolute",
                      top: "7.5px",
                      right: "-50px",
                    }}
                    onClick={() => {
                      if (meal === "Breakfast") {
                        setBreakfast((prev) => [...prev, data.name]);
                        setShowBreakfast(true);
                      } else if (meal === "Lunch") {
                        setLunch((prev) => [...prev, data.name]);
                        setShowLunch(true);
                      } else if (meal === "Dinner") {
                        setDinner((prev) => [...prev, data.name]);
                        setShowDinner(true);
                      } else if (meal === "Snacks") {
                        setSnacks((prev) => [...prev, data.name]);
                        setShowSnacks(true);
                      }
                      // make local cook to arr, get arr, push obj into arr, set local cook
                      if (localStorage.getItem(meal) !== null) {
                        localStorage.setItem(
                          meal,
                          localStorage.getItem(meal) + JSON.stringify(data)
                        );
                      } else {
                        localStorage.setItem(meal, JSON.stringify(data));
                      }
                    }}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
    );
  };

  const foodInfo = (food) => {
    return (
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundColor: "#00000050",
        }}
      >
        <div
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)", // transform !== transfrom
            backgroundColor: "#C6E377",
            boxShadow: "0px 5px 15px 0px rgba(0, 0, 0, 0.5)",
            padding: "50px",
            borderRadius: "20px",
          }}
        >
          <h4
            style={{
              fontSize: "20px",
            }}
          >
            Food: {food}
          </h4>
          <div
            className="CalorieTracker-foods-title-underline"
            style={{
              position: "relative",
              left: "0px",
              width: "100%",
              backgroundColor: "#36622B90",
            }}
          ></div>
          {foods.map((item, index) =>
            item.name === food
              ? Object.entries(item).map(([key, val]) =>
                  key != "idfoods" && key != "name" ? (
                    <h2 key={key} style={{ fontWeight: "400" }}>
                      {key}: {val}
                    </h2>
                  ) : null
                )
              : null
          )}
          <div
            className="close-btn-signup"
            style={{
              width: "60px",
              height: "60px",
            }}
            onClick={() => {
              setShowFoodInfo(null);
            }}
          >
            <div
              className="close-btn-signup-line-one"
              style={{
                width: "40px",
                height: "5px",
                position: "absolute",
                top: "20px",
              }}
            ></div>
            <div
              className="close-btn-signup-line-two"
              style={{
                width: "40px",
                height: "5px",
                position: "absolute",
                top: "20px",
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  const superSubFoodsAdded = (food, index, meal) => {
    return (
      <div>
        <h6
          style={{
            fontSize: "16px",
            marginTop: "10px",
            fontWeight: 500,
          }}
        >
          {food}
        </h6>
        <img
          src={require("../../images/diet-plan.png")}
          style={{
            position: "absolute",
            top: index * 36 + -45 + "px",
            left: "200px",
            width: "30px",
            height: "30px",
          }}
          onClick={() => {
            setShowFoodInfo(food);
          }}
        ></img>
        <div
          style={{
            position: "absolute",
            left: "240px",
            top: index * 36 + "px",
            height: "3px",
            width: "20px",
            borderRadius: "5px",
            opacity: 0.7,
            padding: "15px",
          }}
          onClick={() => {
            let cookie = JSON.parse(localStorage.getItem(meal)); // the art of formatting cookies lmao... plz kill me
            // omfg i've had a bug for 4 hours but i solved it when i went to take a shit
            // plz kill me
            console.log(cookie);
            /*cookie = cookie
              .toString()
              .replaceAll('"', "")
              .replaceAll("{", "")
              .split("}");
            cookie = cookie.slice(0, -1);
            for (let i = 0; i < cookie.length; i++) {
              cookie[i] = cookie[i].toString().split(",");
            }
            cookie = cookie.toString().replaceAll(":", ",");
            cookie = cookie.toString().split(",");
            let cookieArr = [];
            for (let i = 0; i < cookie.length; i += 20) {
              cookieArr.push(cookie.slice(i, i + 20));
            }
            console.log("cookieArr:");
            console.log(cookieArr);
            let cookieObjStr = "";
            for (let i = 0; i < cookieArr.length; i++) {
              cookieObjStr += "{";
              for (let j = 0; j < cookieArr[i].length; j += 2) {
                cookieObjStr += `"${cookieArr[i][j]}":${cookieArr[i][j + 1]},`; // "${cookieArr[i][j + 1]}"
              }
              cookieObjStr = cookieObjStr.slice(0, -1);
              cookieObjStr += "}";
            }
            console.log(cookieObjStr);*/
            if (meal === "Breakfast") {
              setBreakfast((prev) => [
                ...prev.slice(0, index),
                ...prev.slice(index + 1, prev.length),
              ]);
              //localStorage.setItem("Breakfast", cookieObjStr);
            } else if (meal === "Lunch") {
              setLunch((prev) => [
                ...prev.slice(0, index),
                ...prev.slice(index + 1, prev.length),
              ]);
            } else if (meal === "Dinner") {
              setDinner((prev) => [
                ...prev.slice(0, index),
                ...prev.slice(index + 1, prev.length),
              ]);
            } else if (meal === "Snacks") {
              setSnacks((prev) => [
                ...prev.slice(0, index),
                ...prev.slice(index + 1, prev.length),
              ]);
            }
          }}
        >
          <div
            style={{
              height: "3px",
              width: "20px",
              position: "relative",
              left: "-10px",
              backgroundColor: "black",
            }}
          ></div>
        </div>
        <div
          className="CalorieTracker-foods-title-underline"
          style={{
            position: "relative",
            left: "0px",
            width: "90%",
            backgroundColor: "#36622B90",
          }}
        ></div>
      </div>
    );
  };

  const subFoodsAdded = (meal) => {
    return (
      <>
        {meal === "Breakfast" && showBreakfast
          ? Breakfast.map((item, index) => (
              <div key={index}>{superSubFoodsAdded(item, index, meal)}</div>
            ))
          : meal === "Lunch" && showLunch
          ? Lunch.map((item, index) => (
              <div key={index}>{superSubFoodsAdded(item, index, meal)}</div>
            ))
          : meal === "Dinner" && showDinner
          ? Dinner.map((item, index) => (
              <div key={index}>{superSubFoodsAdded(item, index, meal)}</div>
            ))
          : meal === "Snacks" && showSnacks
          ? Snacks.map((item, index) => (
              <div key={index}>{superSubFoodsAdded(item, index, meal)}</div>
            ))
          : null}
      </>
    );
  };

  const mealFoodsArea = (meal, pos, center) => {
    if (!showBreakfast && meal !== "Breakfast") {
      pos = pos - Breakfast.length * 40;
    }

    if (!showLunch && meal !== "Lunch" && meal !== "Breakfast") {
      pos = pos - Lunch.length * 40;
    }

    if (
      !showDinner &&
      meal !== "Dinner" &&
      meal !== "Lunch" &&
      meal !== "Breakfast"
    ) {
      pos = pos - Dinner.length * 40;
    }

    return (
      <div
        className="CalorieTracker-foods-wrapper"
        style={{
          marginTop: pos + "px",
          marginLeft: center + "px",
        }}
      >
        <div className="CalorieTracker-foods-breakfast">
          <h4 className="CalorieTracker-foods-meal-title">{meal}</h4>
          <img
            className="CalorieTracker-foods-title-dropdown"
            src={require("../../images/dropdown.png")}
            alt=""
            style={{ opacity: 0.75 }}
            onClick={() => {
              if (meal === "Breakfast") {
                setShowBreakfast(!showBreakfast);
              } else if (meal === "Lunch") {
                setShowLunch(!showLunch);
              } else if (meal === "Dinner") {
                setShowDinner(!showDinner);
              } else if (meal === "Snacks") {
                setShowSnacks(!showSnacks);
              }
            }}
          />
          <img
            className="CalorieTracker-foods-title-add"
            src={require("../../images/add.png")}
            alt=""
            style={{
              left: "180px",
              top: "-50px",
              width: "40px",
              height: "40px",
            }}
            onClick={() => {
              setAddMeal(meal);
            }}
          />
          <img
            src={require("../../images/info.png")}
            alt=""
            style={{
              left: "140px",
              top: "-45px",
              width: "30px",
              height: "30px",
            }}
          />
          <div className="CalorieTracker-foods-title-underline"></div>
          <div
            style={{
              position: "absolute",
              width: "300px",
              left: "-75px",
              marginTop: "10px",
            }}
          >
            {subFoodsAdded(meal)}
          </div>
        </div>
      </div>
    );
  };

  const CaloriesTracker = () => {
    const tabs = ["Calorie Tracker", "Friends"];
    return (
      <>
        <div className="main-page-container">
          {pageNavbarTabs(tabs[0], navbarTabsPressed === tabs[0])}
          {pageNavbarTabs(tabs[1], navbarTabsPressed === tabs[1])}
        </div>
        {navbarTabsPressed === tabs[0] ? (
          <>
            <div className="CalorieTracker-foods-container">
              <h4 className="CalorieTracker-foods-title">Your Foods</h4>
              <img src={require("../../images/info.png")} alt="" />
              {mealFoodsArea("Breakfast", 0, 0)}
              {mealFoodsArea("Lunch", Breakfast.length * 40 + 50, -40)}
              {mealFoodsArea(
                "Dinner",
                (Breakfast.length + Lunch.length) * 40 + 100,
                -30
              )}
              {mealFoodsArea(
                "Snacks",
                (Breakfast.length + Lunch.length + Dinner.length) * 40 + 150,
                -30
              )}
            </div>
          </>
        ) : null}
        {addMeal === "Breakfast"
          ? searchBar("Breakfast")
          : addMeal === "Lunch"
          ? searchBar("Lunch")
          : addMeal === "Dinner"
          ? searchBar("Dinner")
          : addMeal === "Snacks"
          ? searchBar("Snacks")
          : null}
        {showFoodInfo !== null ? foodInfo(showFoodInfo) : null}
      </>
    );
  };

  const Progress = () => {
    const tabs = ["Progress", "Statistics", "Friends"];
    return (
      <div className="main-page-container">
        {pageNavbarTabs(tabs[0], navbarTabsPressed === tabs[0])}
        {pageNavbarTabs(tabs[1], navbarTabsPressed === tabs[1])}
        {pageNavbarTabs(tabs[2], navbarTabsPressed === tabs[2])}
      </div>
    );
  };

  const Account = () => {
    const tabs = ["Account", "Calorie Goal", "Settings"];
    return (
      <div className="main-page-container">
        {pageNavbarTabs(tabs[0], navbarTabsPressed === tabs[0])}
        {pageNavbarTabs(tabs[1], navbarTabsPressed === tabs[1])}
        {pageNavbarTabs(tabs[2], navbarTabsPressed === tabs[2])}
      </div>
    );
  };

  const ContactUs = () => {
    const tabs = ["Contact Us", "Who are we?"];
    return (
      <div className="main-page-container">
        {pageNavbarTabs(tabs[0], navbarTabsPressed === tabs[0])}
        {pageNavbarTabs(tabs[1], navbarTabsPressed === tabs[1])}
      </div>
    );
  };

  return (
    <div>
      <div>
        <NavBar pulledFrom={"home"} btnPress={handleNavbarBtn} />
        {navBarButtonPressed ? (
          <div>
            <h4>{navBarButtonPressed}</h4>
          </div>
        ) : null}
      </div>
      <div className="home-container">
        {isDesktop ? <>{sidebar()}</> : <></>}
      </div>
    </div>
  );
}

export default Home;
