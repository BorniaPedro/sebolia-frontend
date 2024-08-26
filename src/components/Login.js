import React from "react";
import SocialLogin from "./InputField";
import "../styles/login.css";
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="login-container">
      <h2 className="form-title">Fazer o login</h2>

      <form action="#" className="login-form">
        <SocialLogin type="text" placeholder="Usuário" icon="person" />
        <SocialLogin type="password" placeholder="Senha" icon="lock" />

        <button className="login-button">Entrar</button>

        <Link to="/CriarConta" className="create-account">
          Não tem uma conta?
        </Link>	
      </form>
      
    </div>
  )
}

export default Login