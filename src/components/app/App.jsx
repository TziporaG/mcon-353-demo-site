import "./App.css";
import React from "react";
import { Home } from "../home/home";
import { ToDo } from "../todo/todo";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Header } from "../header/header";
import { Chat } from "../chat/chat";
import { TodoProvider } from "./context";

function App() {
  return (
    <TodoProvider>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<ToDo />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </HashRouter>
    </TodoProvider>
  );
}

export default App;
