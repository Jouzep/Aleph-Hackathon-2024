import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./Views/HomeView";
import LoginView from "./Views/LoginView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path={"/login"} element={<LoginView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
