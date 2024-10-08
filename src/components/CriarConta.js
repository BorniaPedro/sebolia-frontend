import React, { useState } from "react";
import "../styles/login.css"
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { Link } from 'react-router-dom';



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
                "Content-Type": "application/json",
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
                Swal.fire({
                    title: `${body.message}`,
                    icon: "error",
                 });
                return;
            }
            
            Swal.fire({
                title: "Usuário cadastrado com sucesso",
                icon: "success",
             }).then(() =>{
                window.location.href = "http://localhost:3000/Login";
             });
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

                <button onClick={handleSubmit} className="login-button">Criar Conta</button>
                <Link to="/Login" className="create-account">
                    Já possui uma conta?
                </Link>
            </form>
        </div>
    )
}

export default CriarConta; 