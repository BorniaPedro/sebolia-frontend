import React, { useState, useEffect } from "react";
import "../styles/perfil.css";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { NumericFormat } from 'react-number-format'

function Perfil() {
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isAddBalanceModalOpen, setIsAddBalanceModalOpen] = useState(false);
    const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);
    const [usuario, setUsuario] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senhaAntiga, setSenhaAntiga] = useState("");
    const [senhaNova, setSenhaNova] = useState("");
    const [saldoUsuario, setSaldoUsuario] = useState("");
    const [campoSaldo, setCampoSaldo] = useState("");
    const [senhaExcluir, setSenhaExcluir] = useState("");

    const validateUser = async() => {
        const usuario = await getSession();
        if(!usuario){
          Swal.fire({
            title: "É necessário estar logado para acessar essa tela",
            icon: "error",
          }).then(() =>{
            window.location.href = "http://localhost:3000/Login";
          });
        }
      }

    const getSession = async () =>{
        const url = "http://localhost:3500/login/session";
    
        const response = await fetch(url, {credentials: "include"});
    
        const json = await response.json();

        if(!json?.user){
            return;
        }
        
        setUsuario(json.user.usuario);
        setTelefone(json.user.celular);
        setSaldoUsuario(json.user.saldo);
        
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
                Swal.fire({
                    title: `${body.message}`,
                    icon: "error",
                 });
                return;
            }
            Swal.fire({
               title: "Perfil atualizado com sucesso!",
               icon: "success",
            });
        });

        
    };

    const handleAtualizarSenha = async (e) => {
        e.preventDefault();
        const url = "http://localhost:3500/cadastro/alterarSenha";
        
        fetch(url, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                senhaAntiga,
                senhaNova
            }),
        })
        .then(async (response) => {
            if(!response.ok){
                const body = await response.json();
                Swal.fire({
                    title: `${body.message}`,
                    icon: "error",
                 });
                return;
            }

            Swal.fire({
                title: "Senha atualizada com sucesso!",
                icon: "success",
             });

        });
    }

    const handleDeleteConta = async (e) => {
        e.preventDefault();
        const url = "http://localhost:3500/cadastro";

        fetch(url, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                senha: senhaExcluir
            })
        })
        .then(async (response) => {
            if(!response.ok){
                const body = await response.json();
                Swal.fire({
                    title: `${body.message}`,
                    icon: "error",
                 });
                return;
            }

            Swal.fire({
                title: "Conta deletada com sucesso!",
                icon: "success",
             }).then(() => {
                window.location.href = "http://localhost:3000/CriarConta";
             });
             
        });
    }

    const handleAdicionarSaldo = async (e) => {
        e.preventDefault();
        
        const url = "http://localhost:3500/cadastro/adicionarSaldo";
        
        fetch(url, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                saldo: campoSaldo.replace('R$ ', '').replace(',', '.')
            }),
        })
        .then(async (response) => {
            Swal.fire({
                title: 'Efetuado Pagamento',
                allowEscapeKey: false,
                allowOutsideClick: false,
                timer: 2000,
                didOpen: () => {
                    Swal.showLoading();
                }
            }).then(async () =>{
                if(!response.ok){
                    const body = await response.json();
                    Swal.fire({
                        title: `${body.message}`,
                        icon: "error",
                        });
                    return;
                }
    
                Swal.fire({
                    title: "Saldo adicionado com sucesso!",
                    icon: "success",
                    });
                    getSession();
            })

        });
    }

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
    }

    const closeDeleteAccountModal = () => {
        setIsDeleteAccountModalOpen(false);
    }

    return (
        <div className="perfil-container">
            <div className="perfil-header">   
                <Link to="/" className="voltar-button-perfil">Voltar</Link>
                <h2 className="perfil-titulo">Perfil</h2>
            </div>
                <span className="saldo-perfil">Seu saldo: {saldoUsuario} </span>

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
                            onChange={(e) => setSenhaAntiga(e.target.value)}
                            type="password"
                            placeholder="Senha Antiga"
                            className="perfil-info"
                            />
                        <input
                            onChange={(e) => setSenhaNova(e.target.value)}
                            type="password"
                            placeholder="Senha Nova"
                            className="perfil-info"
                        />
                        <button className="perfil-button" onClick={handleAtualizarSenha}>Salvar Senha</button>
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
                        <NumericFormat
                            decimalSeparator=","
                            prefix="R$ "
                            decimalScale={2}
                            required
                            value={campoSaldo}
                            allowNegative={false}
                            placeholder="Valor"
                            className="perfil-info"
                            onChange={(e) => setCampoSaldo(e.target.value)}
                        />

                        <button onClick={handleAdicionarSaldo} className="perfil-button">Adicionar</button>
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
                            onChange={(e) => setSenhaExcluir(e.target.value)}
                            type="password"
                            placeholder="Senha"
                            className="perfil-info"
                        />
                        <button className="excluirConta-button" onClick={handleDeleteConta}>Excluir Conta</button>
                        <button className="close-button" onClick={closeDeleteAccountModal}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Perfil;
