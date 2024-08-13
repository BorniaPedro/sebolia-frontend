import React from "react";
import SocialLogin from "./InputField";
import "../login.css";

function Login() {
  return (
    <div className="login-container">
      <h2 className="form-title">Fazer o login</h2>

      <form action="#" className="login-form">
        <SocialLogin type="text" placeholder="Usuário" icon="person" />
        <SocialLogin type="password" placeholder="Senha" icon="lock" />

        <a href="#" className="create-account">Não tem uma conta?</a>

        <button className="login-button">Entrar</button>	
      </form>
      
    </div>
  )
}

export default Login