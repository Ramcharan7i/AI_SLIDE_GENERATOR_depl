
import React from "react";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";

function App(){

  const token = localStorage.getItem("token");

  if(!token){
    return <LoginPage/>
  }

  return <Dashboard/>
}

export default App;
