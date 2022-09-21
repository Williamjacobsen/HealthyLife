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
  const [addBreakfast, setAddBreakfast] = useState([]);
  const [addLunch, setAddLunch] = useState([]);
  const [addDinner, setAddDinner] = useState([]);
  const [addSnacks, setAddSnacks] = useState([]);
  const [search, setSearch] = useState("");

  const [foods, setFoods] = useState(null);

  const handleNavbarBtn = (handleNavbarBtn) => {
    setNavBarButtonPressed(handleNavbarBtn);
  };

  useEffect(() => {
    if (username !== null && password !== null) {
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
    if (foods !== null) {
      console.log(foods);
    }
  }, [foods]);

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

  const searchBar = () => {
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
                    onClick={() =>
                      setAddBreakfast((prev) => [...prev, data.name])
                    }
                  />
                </div>
              ))
            : null}
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
        <div>
          <div className="CalorieTracker-foods-container">
            <h4 className="CalorieTracker-foods-title">Your Foods</h4>
            <img src={require("../../images/info.png")} alt="" />
            <div className="CalorieTracker-foods-wrapper">
              <div className="CalorieTracker-foods-breakfast">
                <h4 className="CalorieTracker-foods-meal-title">Breakfast</h4>
                <img
                  className="CalorieTracker-foods-title-dropdown"
                  src={require("../../images/dropdown.png")}
                  alt=""
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
                    setAddMeal("Breakfast");
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
              </div>
              <div className="CalorieTracker-foods-lunch"></div>
              <div className="CalorieTracker-foods-dinner"></div>
              <div className="CalorieTracker-foods-snacks"></div>
            </div>
          </div>
        </div>
        {addMeal === "Breakfast" ? searchBar() : <></>}
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
