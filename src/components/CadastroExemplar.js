import React from "react";
import "../styles/cadastroExemplar.css"

function ListarExemplar() {
    return (
        <div className="cadastroExemplar-container">
            <div className="cadastroExemplar-header">
                <h2>Cadastro<br/> de exemplar</h2>
            </div>
            <form className="cadastroExemplar-form">
                <p>Livro</p>
                <select className="exemplarInfo">
                    <option value="">Selecione</option>
                    <option value="1">Livro 1</option>
                </select>
                <p>Estado de conservação</p>
                <select className="exemplarInfo">
                    <option value="">Selecione</option>
                    <option value="1">Semi-novo</option>
                    <option value="2">Usado</option>
                    <option value="3">Danificado</option>
                </select>
                <p>Quantidade</p> 
                <input type="number" className="exemplarInfo" step="0" min="0" required/>
                <p>Preço</p>
                <input type="number" className="exemplarInfo" step="0.01" min="0" required/>
                <button className="cadastroExemplar-button">Cadastrar Exemplar</button>
            </form>
        </div>
    );
}

export default ListarExemplar;