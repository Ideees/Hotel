import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./screen/Login";
import Sign from "./screen/Signup";
import Forgot from "./screen/Forget";
import Home from "./screen/Home";
 
import Pannel from "./screen/pannel";
 

import Rest from "./screen/Resetpassword";
import ProfileCard from "./screen/ProfileCard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pannel" element={<Pannel />} />
        <Route   path="/" element={<Login />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/forget" element={<Forgot />} />
        <Route path="/home" element={<Home />} />
        <Route path="/restPassword/:id/:token" element={<Rest />} />
        <Route   path="/profile" element={< ProfileCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
