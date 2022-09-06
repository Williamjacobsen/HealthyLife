import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import StartingPage from "./pages/startingPage/startingPage";
import Home from "./pages/Home/Home";
import "./App.css";

function App() {
  /* eslint-disable */
  const [loginStatus, setLoginStatus] = useState(false);

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:5000/LogInGet").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(true);
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          {loginStatus ? (
            <Route path="/" element={<Navigate replace to="/home" />} />
          ) : null}
          <Route path="/" element={<StartingPage />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<Home />} path="/home" exact></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
