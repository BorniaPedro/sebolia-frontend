import React, { useState } from "react";
import "../styles/login.css"

function CriarConta() {
    // const [nome, setNome] = useState("");
    const [usuario, setUsuario] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        const url = "http://localhost:3500/cadastro";

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application.json",
            },
            body: JSON.stringify({
                // nome: nome,
                usuario: usuario,
                telefone: telefone,
                confirmarSenha: confirmarSenha,
                senha: senha
            })
        })
        .then(async(response) => {
            if(!response.ok){
                const body = await response.json();
                console.log(body);
                alert(body.message);
                return;
            }
            alert("Usuário cadastrado com sucesso");
        });
    };
    
    return(
        <div className="login-container">
            <h2 className="form-title">Crie sua conta</h2>

            <form action="#" className="login-form">
                <input 
                    type="text"
                    placeholder="Usuário" 
                    className="input-field" 
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                />
                <input 
                    type="password" 
                    placeholder="Senha" 
                    className="input-field" 
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
                <input 
                    type="password" 
                    placeholder="Confirmar Senha" 
                    className="input-field" 
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    required
                />
                <input 
                    type="tel" 
                    placeholder="Telefone" 
                    className="input-field" 
                    onChange={(e) => setTelefone(e.target.value)}
                    required
                />

                <button onClick={handleSubmit}className="login-button">Criar Conta</button>
            </form>
        </div>
    )
}

export default CriarConta