import React from "react";
import "../styles/vendaLivro.css"

function VendaLivro() {
    return (
        <div className="vendaLivro-container">
            <div className="vendaLivro-header">
                <h2>Venda de Livro</h2>
            </div>
            <form className="vendaLivro-form">
                <p>Livro</p>
                <input type="text" className="vendaInfo" disabled value="Livro 1"/>
                <p>Estado de conservação</p>
                <input type="text" className="vendaInfo" disabled value="Usado"/>
                <p>Preço sugerido</p>
                <input type="number" className="vendaInfo" step="0.01" min="0" required/>
                <button className="vendaLivro-button">Vender Livro</button>
            </form>
        </div>
    );
}

export default VendaLivro;