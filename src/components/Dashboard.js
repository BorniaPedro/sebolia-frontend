import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';

function Dashboard() {
  return (
    <div className='dashboard-container'>
      <div className='titulo-dashboard'>
        <h2>Sebolia</h2>
        <p>o seu sebo online!</p>
      </div>
      <div className='botoes'>
        <Link to="/ListagemLivros" className='botao'>Listagem de livros</Link>
        <Link to="/Historico" className='botao'>Histórico</Link>
        <Link to="/Perfil" className='botao'>Perfil</Link>
      </div>
    </div>
  );
}

export default Dashboard;