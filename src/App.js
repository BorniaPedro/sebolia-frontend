import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Login from "./components/login";
import Teste from "./components/Teste";
import NavBar from './components/NavBar';

function App() {
  return (
    <div>
      <NavBar />
      <Routes> 
        <Route path="/" elemnt={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Teste" element={<Teste />} />
      </Routes>
    </div>
  );
}

export default App;