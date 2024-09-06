import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';

function Dashboard() {
  const [user, setUser] = useState('');

  const getSession = async () =>{
    const url = "http://localhost:3500/login/session";

    const response = await fetch(url, {credentials: "include"});

    const json = await response.json();
    setUser(json.user);
    return json.user;
  }

  const validateUser = async() => {
    const usuario = await getSession();
    if(!usuario){
      window.location.href = "http://localhost:3000/Login";
    }
  }

  useEffect(() => {
    validateUser();
  }, []);

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