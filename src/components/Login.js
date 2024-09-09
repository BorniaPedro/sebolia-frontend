import React from "react";
import "../styles/login.css";
import { Link } from 'react-router-dom';
import { useState } from "react";

function Login() {

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const url = "http://localhost:3500/login";

    fetch(url, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario: usuario,
        senha: senha
      })
    })
    .then(async(response) => {
      if(!response.ok){
        const body = await response.json();
        Swal.fire({
            title: `${body.message}`,
            icon: "error",
         });
        return;
     }
     Swal.fire({
      title: "Perfil atualizado com sucesso!",
      icon: "success",
      }.then(() =>{
        window.location.href = "http://localhost:3000";
      }));
    });
  }

  return (
    <div className="login-container">
      <h2 className="form-title">Fazer o login</h2>

      <form action="#" className="login-form">
        <input onChange={(e) => setUsuario(e.target.value)} type="text" placeholder="Usuário" className="input-field"/>
        <input onChange={(e) => setSenha(e.target.value)} type="password" placeholder="Senha" className="input-field" />

        <button onClick={handleSubmit} className="login-button">Entrar</button>

        <Link to="/CriarConta" className="create-account">
          Não tem uma conta?
        </Link>	
      </form>
      
    </div>
  )
}


export default Login;

