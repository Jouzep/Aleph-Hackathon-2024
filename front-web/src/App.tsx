import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./Views/HomeView";
import { Context } from "wagmi";
import { ContextProvider } from "./context/Context";
import Dashboard from "./Views/Dashboard";
import SIdebar from "./Component/SIdebar";
import Inventory from "./Views/Inventory";
import Public from "./Views/Public";

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route element={<SIdebar />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/public" element={<Public />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
