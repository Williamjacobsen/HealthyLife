import React from "react";
import NavBar from "./../../utils/NavBar/NavBar";
import { useState, useEffect } from "react";
import Axios from "axios";
import "./Home.css";

function Home() {
  /* eslint-disable */
  const [navBarButtonPressed, setNavBarButtonPressed] = useState(null);
  const [navbarTabsPressed, setNavbarTabsPressed] = useState("Your Foods");
  const [sidebarTabsPressed, setSidebarTabsPressed] =
    useState("Calorie Tracker");

  const [username, setUsername] = useState(null);

  useEffect(() => {
    Axios.defaults.withCredentials = true;
    Axios.get("http://localhost:5000/LogInGet").then((response) => {
      setUsername(response.data.user[0].username);
    });
  }, []);

  const handleNavbarBtn = (handleNavbarBtn) => {
    setNavBarButtonPressed(handleNavbarBtn);
  };

  useEffect(() => {
    console.log(navbarTabsPressed);
  }, [navbarTabsPressed]);

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
          }}
        >
          <h4>{title}</h4>
        </div>
      </>
    );
  };

  const sidebar = () => {
    return (
      <>
        <div className="sidebar-container">
          <div className="sidebar-account">
            <div className="sidebar-account-icon"></div>
            <div className="sidebar-center-account">
              <h4>{username}</h4>
            </div>
            <div className="sidebar-center-account">
              <p>Total Points: </p>
            </div>
          </div>
          <div className="sidebar-tabs">
            {sidebarTabs(
              "Calorie Tracker",
              sidebarTabsPressed === "Calorie Tracker",
              1
            )}
            {sidebarTabs("Progess", sidebarTabsPressed === "Progess", 2)}
            {sidebarTabs("Account", sidebarTabsPressed === "Account", 3)}
            {sidebarTabs("Contact Us", sidebarTabsPressed === "Contact Us", 4)}
          </div>
        </div>
        <div>
          {sidebarTabsPressed === "Calorie Tracker" ? CaloriesTracker() : null}
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

  const CaloriesTracker = () => {
    return (
      <div className="main-page-container">
        {pageNavbarTabs("Your Foods", navbarTabsPressed === "Your Foods")}
        {pageNavbarTabs("Friends", navbarTabsPressed === "Friends")}
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
      {sidebar()}
    </div>
  );
}

export default Home;
