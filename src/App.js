import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Login from "./components/Login";
import CadastroLivro from "./components/CadastroLivro";
import CriarConta from "./components/CriarConta";
import ListagemLivros from "./components/ListagemLivros";
import VendaLivro from "./components/VendaLivro";
import NavBar from './components/NavBar';
import "./styles/NavBar.css";

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CadastroLivro" element={<CadastroLivro />} />
        <Route path="/ListagemLivros" element={<ListagemLivros />} />
        <Route path="/CriarConta" element={<CriarConta />} />
        <Route path="/VendaLivro" element={<VendaLivro />} />
      </Routes>
    </div>
  );
}

export default App;