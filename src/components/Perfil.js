import React, { useState } from "react";
import "../styles/perfil.css";
import { Link } from "react-router-dom";

function Perfil() {
    // Estados para controlar a exibição das modais
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isAddBalanceModalOpen, setIsAddBalanceModalOpen] = useState(false);
    const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);

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
                    type="text"
                    placeholder="Usuário"
                    className="perfil-info"
                />
                <input
                    type="tel"
                    placeholder="Telefone"
                    className="perfil-info"
                />
                <button className="perfil-button">
                    Salvar alterações
                </button>
            </form>

            <div className="button-container">
                <button className="senha-button" onClick={openPasswordModal}>
                    Alterar Senha
                </button>

                <button className="saldo-button" onClick={openAddBalanceModal}>
                    Adicionar saldo
                </button>

                <button className="excluir-button" onClick={openDeleteAccountModal}>
                    Excluir conta
                </button>
            </div>

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
                        <p className="excluir-content">Para confirmar a exclusão, digite sua senha:</p>
                        <input
                            type="password"
                            placeholder="Senha"
                            className="perfil-info"
                        />
                        <button className="excluirConta-button">Excluir Conta</button>
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
