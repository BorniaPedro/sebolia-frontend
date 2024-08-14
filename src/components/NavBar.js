import React from 'react';
import { Link } from 'react-router-dom';
import "../NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><Link to="/Login" className="nav-link">Login</Link></li>
        <li><Link to="/CadastroLivro" className="nav-link">Cadastro de Livro</Link></li>
        <li><Link to="/Teste" className="nav-link">Teste</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
