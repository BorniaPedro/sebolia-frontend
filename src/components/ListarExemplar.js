import React from "react";
import "../styles/ListarExemplar.css"; // Importa o CSS corretamente

const exemplares = [
  {
    id: 1,
    livroId: "001",
    estadoConservacao: "Novo",
    preco: 50.00,
  },
  {
    id: 2,
    livroId: "002",
    estadoConservacao: "Usado - Bom",
    preco: 30.00,
  },
  {
    id: 3,
    livroId: "003",
    estadoConservacao: "Usado - Aceitável",
    preco: 20.00,
  },
];

function Listar_Exemplar() {
  return (
    <div className="container">
      <h2 className="header">Lista de Exemplares</h2>
      <ul>
        {exemplares.map((exemplar) => (
          <li key={exemplar.id} className="list-item">
            <div>
              <span className="label">ID do Livro:</span> {exemplar.livroId}
            </div>
            <div>
              <span className="label">Estado de Conservação:</span> {exemplar.estadoConservacao}
            </div>
            <div>
              <span className="label">Preço:</span> <span className="price">R${exemplar.preco.toFixed(2)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Listar_Exemplar;
