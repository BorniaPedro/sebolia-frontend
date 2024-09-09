import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import "../styles/cadastroLivro.css";

function CadastroLivro() {
    const [id, setId] = useState("");
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [anoLancamento, setAnoLancamento] = useState("");
    const [editora, setEditora] = useState("");

    const location = useLocation();
    const param = location.search.split("=");

    const validateUser = async() => {
        const usuario = await getSession();
        if(usuario?.role !== "admin"){
          Swal.fire({
            title: "É necessário ser administrador para acessar essa tela",
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
        return json.user;
      }

    useEffect(() =>{
        validateUser();

        if(param && param[0] === "?livro"){
            getLivro(param[1]);
        }
    }, []);

    const getLivro = async (id) => {
        const url = `http://localhost:3500/livro/${id}`;

        const response = await fetch(url, {credentials: "include"});
      
        const json = await response.json();
        setLivroEdicao(json);
    };

    const setLivroEdicao = (livro) =>{
        setId(livro.id);
        setTitulo(livro.titulo || "");
        setAutor(livro.autor || "");
        setAnoLancamento(livro.ano || "");
        setEditora(livro.editora || "");
    };

    const clear = () =>{
        setId("");
        setTitulo("");
        setAutor("");
        setAnoLancamento("");
        setEditora("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let url;
        let method;

        if (id) {
            url = `http://localhost:3500/livro/${id}`;
            method = "PUT";
        } else {
            url = "http://localhost:3500/livro";
            method = "POST";
        }

        fetch(url, {
            method: method,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                titulo: titulo,
                autor: autor,
                ano: anoLancamento,
                editora: editora,
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
                title: "Livro salvo com sucesso!",
                icon: "success",
             }).then(() =>{
                 clear();
                 window.location.href = "http://localhost:3000/ListagemLivros";
             });
        });
        
    };

    return (
        <div className="CadastroLivro-container">
            <h2 className="form-title">Cadastro de Livro</h2>

            <form className="cadastroLivro-form">
                <input
                    type="text"
                    placeholder="Nome do Livro"
                    className="input-field"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Autor"
                    className="input-field"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Ano de Lançamento"
                    className="input-field"
                    value={anoLancamento}
                    onChange={(e) => setAnoLancamento(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Editora"
                    className="input-field"
                    value={editora}
                    onChange={(e) => setEditora(e.target.value)}
                    required
                />

                <button onClick={handleSubmit} className="cadastroLivro-button">
                    Cadastrar
                </button>
            </form>
        </div>
    );
}

export default CadastroLivro;
