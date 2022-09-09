import React from "react";
import NavBar from "./../../utils/NavBar/NavBar";
import { useState } from "react";
import "./Home.css";

function Home() {
  const [navBarButtonPressed, setNavBarButtonPressed] = useState(null);

  return (
    <div>
      <NavBar pulledFrom={"home"} btnPress={setNavBarButtonPressed} />
    </div>
  );
}

export default Home;
