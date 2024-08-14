import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Login from "./components/Login";
import Teste from "./components/Teste";
import CadastroLivro from "./components/CadastroLivro";
import NavBar from './components/NavBar';
import "./NavBar.css";

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CadastroLivro" element={<CadastroLivro />} />
        <Route path="/Teste" element={<Teste />} />
      </Routes>
    </div>
  );
}

export default App;