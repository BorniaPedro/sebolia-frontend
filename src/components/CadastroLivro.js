import React, { useState } from "react";
import "../styles/cadastroLivro.css";

function CadastroLivro() {
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [anoLancamento, setAnoLancamento] = useState("");
    const [editora, setEditora] = useState("");
    const [numeroPaginas, setNumeroPaginas] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = "http://localhost:3500/livro";

        fetch(url, {
            method: "POST",
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
                console.log(body)
                alert(body.message);
                return;
            }

            alert("Livro cadastrado com sucesso!");
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
                <input
                    type="text"
                    placeholder="Número de Páginas"
                    className="input-field"
                    value={numeroPaginas}
                    onChange={(e) => setNumeroPaginas(e.target.value)}
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
