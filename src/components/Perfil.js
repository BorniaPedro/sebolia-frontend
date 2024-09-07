import React from "react";
import "../styles/perfil.css"

function Perfil() {
    return(
        <div className="perfil-container">
            <h2 className="perfil-titulo">Perfil</h2>

            <form action="#" className="perfil-form">
                <input 
                    type="text"
                    placeholder="Usuário" 
                    className="perfil-info" 
                />
                <input 
                    type="tel"
                    placeholder="Telefone" 
                    className="perfil-info" 
                />
                <input 
                    type="password" 
                    placeholder="Nova Senha" 
                    className="perfil-info" 
                />
                <input 
                    type="password" 
                    placeholder="Senha Atual" 
                    className="perfil-info" 
                />
                <button className="perfil-button">
                    Salvar alterações
                </button>

                
            </form>

            <button className="saldo-button">
                Adicionar saldo
            </button>

            <button className="excluir-button">
                Excluir conta
            </button>

        </div>
    )
}

export default Perfil