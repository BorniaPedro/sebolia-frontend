import React from "react";
import "../cadastroLivro.css";

function CadastroLivro() {
    return(
        <div className="CadastroLivro-container">
            <h2 className="form-title">Cadastro de Livro</h2>

            <form action="#" className="cadastroLivro-form">
                <input type="text" placeholder="Nome do Livro" className="input-field" required />    
                <input type="text" placeholder="Autor" className="input-field" required />
                <input type="text" placeholder="Gênero" className="input-field" required />
                <input type="text" placeholder="Ano de Lançamento" className="input-field" required />
                <input type="text" placeholder="Editora" className="input-field" required />
                <input type="text" placeholder="Número de Páginas" className="input-field" required />

                <button className="cadastroLivro-button">Cadastrar</button>
            </form>
        </div>
    )
}

export default CadastroLivro;