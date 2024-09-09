import React, { useState, useEffect } from "react";
import "../styles/perfil.css";
import { Link } from "react-router-dom";

function Perfil() {
    // Estados para controlar a exibição das modais
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isAddBalanceModalOpen, setIsAddBalanceModalOpen] = useState(false);
    const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);
    const [usuario, setUsuario] = useState("");
    const [telefone, setTelefone] = useState("");

    const validateUser = async() => {
        const usuario = await getSession();
        if(!usuario){
          alert("É necessário estar logado para acessar essa tela");
          window.location.href = "http://localhost:3000/Login";
        }
    }

    const getSession = async () =>{
        const url = "http://localhost:3500/login/session";
    
        const response = await fetch(url, {credentials: "include"});
    
        const json = await response.json();
        setUsuario(json.user.usuario);
        setTelefone(json.user.celular);
        
        return json.user;
      }
      useEffect(() =>{
        validateUser(); 
    }, []);

    const handleAtualizarCadastro = async (e) => {
        e.preventDefault();

        const url = `http://localhost:3500/cadastro`;

        fetch(url, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                usuario: usuario,
                celular: telefone
            }),
        })
        .then(async (response) => {
            if(!response.ok){
                const body = await response.json();
                alert(body.message);
                return;
            }

            alert("Perfil atualizado com sucesso!");
        });
        
    };

    // Funções para abrir e fechar as modais
    const openPasswordModal = () => {
        setIsPasswordModalOpen(true);
        
    };

    const closePasswordModal = () => {
        setIsPasswordModalOpen(false);
    };

    const openAddBalanceModal = () => {
        setIsAddBalanceModalOpen(true);
    };

    const closeAddBalanceModal = () => {
        setIsAddBalanceModalOpen(false);
    };

    const openDeleteAccountModal = () => {
        setIsDeleteAccountModalOpen(true);
    };

    const closeDeleteAccountModal = () => {
        setIsDeleteAccountModalOpen(false);
    };

    return (
        <div className="perfil-container">
            <div className="perfil-header">   
                <Link to="/dashboard" className="voltar-button">Voltar</Link>
                <h2 className="perfil-titulo">Perfil</h2>
            </div>

            <form action="#" className="perfil-form">
                <input
                    onChange={(e) => setUsuario(e.target.value)}
                    type="text"
                    placeholder="Usuário"
                    className="perfil-info"
                    value={usuario}
                />
                <input
                    onChange={(e) => setTelefone(e.target.value)}
                    type="tel"
                    placeholder="Telefone"
                    className="perfil-info"
                    value={telefone}
                />
                <button className="perfil-button" onClick={handleAtualizarCadastro}>
                    Salvar alterações
                </button>
            </form>

            <button className="saldo-button" onClick={openPasswordModal}>
                Alterar Senha
            </button>

            <button className="saldo-button" onClick={openAddBalanceModal}>
                Adicionar saldo
            </button>

            <button className="excluir-button" onClick={openDeleteAccountModal}>
                Excluir conta
            </button>

            {/* Modal para alterar senha */}
            {isPasswordModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Alterar Senha</h3>
                        <input
                            type="password"
                            placeholder="Nova senha"
                            className="perfil-info"
                        />
                        <input
                            type="password"
                            placeholder="Confirmar nova senha"
                            className="perfil-info"
                        />
                        <button className="perfil-button">Salvar Senha</button>
                        <button className="close-button" onClick={closePasswordModal}>
                            Fechar
                        </button>
                    </div>
                </div>
            )}

            {/* Modal para adicionar saldo */}
            {isAddBalanceModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Adicionar Saldo</h3>
                        <input
                            type="number"
                            placeholder="Valor"
                            className="perfil-info"
                        />
                        <button className="perfil-button">Adicionar</button>
                        <button className="close-button" onClick={closeAddBalanceModal}>
                            Fechar
                        </button>
                    </div>
                </div>
            )}

            {/* Modal para excluir conta */}
            {isDeleteAccountModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Excluir Conta</h3>
                        <p>Para confirmar a exclusão, digite sua senha:</p>
                        <input
                            type="password"
                            placeholder="Senha"
                            className="perfil-info"
                        />
                        <button className="excluir-button">Excluir Conta</button>
                        <button className="close-button" onClick={closeDeleteAccountModal}>
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Perfil;
