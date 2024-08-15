import React from "react";

function CriarConta() {
    return(
        <div className="login-container">
            <h2 className="form-title">Crie sua conta</h2>

            <form action="#" className="login-form">
                <input type="text" placeholder="Usuário" className="input-field" required/>
                <input type="password" placeholder="Senha" className="input-field" required/>
                <input type="password" placeholder="Confirmar Senha" className="input-field" required/>
                <input type="tel" placeholder="Telefone" className="input-field" required/>

                <button className="login-button">Criar Conta</button>
            </form>
        </div>
    )
}

export default CriarConta