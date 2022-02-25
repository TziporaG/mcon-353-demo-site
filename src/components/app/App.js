import "./App.css";
import React from "react";
import { Home } from "../home/home";
import { ToDo } from "../todo/todo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../header/header";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/todo" element={<ToDo />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
