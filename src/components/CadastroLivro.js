import React, { useState, useEffect } from "react";
import "../styles/cadastroLivro.css";

function CadastroLivro() {
    const [nomeLivro, setNomeLivro] = useState("");
    const [autor, setAutor] = useState("");
    const [genero, setGenero] = useState("");
    const [anoLancamento, setAnoLancamento] = useState("");
    const [editora, setEditora] = useState("");
    const [numeroPaginas, setNumeroPaginas] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            nomeLivro,
            autor,
            genero,
            anoLancamento,
            editora,
            numeroPaginas
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
                    value={nomeLivro}
                    onChange={(e) => setNomeLivro(e.target.value)}
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
                    placeholder="Gênero"
                    className="input-field"
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
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
