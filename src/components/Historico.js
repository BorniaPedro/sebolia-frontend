import React from "react";
import "../styles/historico.css"

function Historico() {
    return(
        <div className="historico-container">
            <h2 className="historico-titulo">Histórico do usuário</h2>

            <table className="historico-table">
                <tr className="historico-info">
                    <div className="historico-livroTitulo">Livro 1</div>
                    <div className="historico-livroInfo">
                        <span className="historico-livroEstado">Usado</span>
                        <span className="historico-livroPreco">R$12,90</span>
                        <span className="historico-livroData">06/09/2024</span>
                        <span className="historico-tipo">Compra</span>
                    </div>
                </tr>
            </table>
        </div>

    )
}

export default Historico