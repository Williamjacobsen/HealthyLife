import React from "react";
import NavBar from "./../../utils/NavBar/NavBar";
import { useState, useEffect } from "react";
import "./Home.css";

function Home() {
  const [navBarButtonPressed, setNavBarButtonPressed] = useState(null);

  const handleNavbarBtn = (handleNavbarBtn) => {
    setNavBarButtonPressed(handleNavbarBtn);
  };

  return (
    <div>
      <NavBar pulledFrom={"home"} btnPress={handleNavbarBtn} />
      {navBarButtonPressed ? (
        <div>
          <h4>{navBarButtonPressed}</h4>
        </div>
      ) : null}
    </div>
  );
}

export default Home;
