import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";

function ProtectedRoute() {
  const [isAuth, setIsAuth] = useState(null);

  Axios.defaults.withCredentials = true;
  Axios.get("http://localhost:5000/LogInGet").then((response) => {
    console.log(response.data.loggedIn);
    setIsAuth(response.data.loggedIn);
  });
  
  if (isAuth !== null) { 
    return isAuth ? <Outlet /> : <Navigate to="/" replace={true} />;
  }
}

export default ProtectedRoute;
