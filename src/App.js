import React from "react";
import { Route, Routes } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import CadastroLivro from "./components/CadastroLivro";
import CriarConta from "./components/CriarConta";
import ListagemLivros from "./components/ListagemLivros";
import ListarExemplar from "./components/ListarExemplar";
import CadastroExemplar from "./components/CadastroExemplar";
import VendaLivro from "./components/VendaLivro";
import Historico from "./components/Historico";
import CompraLivro from "./components/CompraLivro";

function App() {
  return (
    <div className="app-container">
      <Routes> 
        <Route path="/" element={<Dashboard />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CadastroLivro" element={<CadastroLivro />} />
        <Route path="/ListagemLivros" element={<ListagemLivros />} />
        <Route path="/CriarConta" element={<CriarConta />} />
        <Route path="/ListarExemplar" element={<ListarExemplar/>} />
        <Route path="/CadastroExemplar" element={<CadastroExemplar/>} />
        <Route path="/VendaLivro" element={<VendaLivro />} />
        <Route path="/Historico" element={<Historico />} />
        <Route path="/CompraLivro" element={<CompraLivro />} />
      </Routes>
    </div>
  );
}

export default App;