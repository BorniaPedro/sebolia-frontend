import React from "react";
import { Route, Routes } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import CadastroLivro from "./components/CadastroLivro";
import CriarConta from "./components/CriarConta";
import ListagemLivros from "./components/ListagemLivros";

function App() {
  return (
    <div className="app-container">
      <Routes> 
        <Route path="/" element={<Dashboard />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CadastroLivro" element={<CadastroLivro />} />
        <Route path="/ListagemLivros" element={<ListagemLivros />} />
        <Route path="/CriarConta" element={<CriarConta />} />
      </Routes>
    </div>
  );
}

export default App;