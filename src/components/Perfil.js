import React from "react";
import "../styles/perfil.css"
import { Link } from "react-router-dom";

function Perfil() {
    return(
        <div className="perfil-container">
            <div className="perfil-header">
                <button className="home-button">
                    <Link to="/dashboard">Home</Link>
                </button>
                <h2 className="perfil-titulo">Perfil</h2>
            </div>

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