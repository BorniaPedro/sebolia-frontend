import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Login from "./components/Login";
import CadastroLivro from "./components/CadastroLivro";
import CriarConta from "./components/CriarConta";
import NavBar from './components/NavBar';
import "./styles/NavBar.css";
import ListarExemplar from "./components/ListarExemplar";

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CadastroLivro" element={<CadastroLivro />} />
        <Route path="/CriarConta" element={<CriarConta />} />
        <Route path="/ListarExemplar" element={<ListarExemplar/>} />
      </Routes>
    </div>
  );
}

export default App;