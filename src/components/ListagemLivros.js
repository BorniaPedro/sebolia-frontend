import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "../styles/listagemLivros.css"
import { livros } from "./LivroData";

function ListagemLivros() {
  const [showOptions, setShowOptions] = useState({});

  const toggleOptions = (livroId) => {
    setShowOptions((prevState) => ({
      ...prevState,
      [livroId]: !prevState[livroId],
    }));
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.opcoes-menu') && !event.target.closest('.livro-editar')) {
      setShowOptions({});
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="listagem-container">
      <div className="header">
        <h2 className="titulo">Listagem de Livros</h2>
        <Link to="/CadastroLivro" className="cadastro-livro">
          Cadastrar Livro
        </Link>
      </div>

      <table className="livro-table">
        <tbody>
          {livros.map((book) => (
            <tr key={book.id} className="livro-container">
              <td colSpan="5">
                <div className="livro-titulo">{book.titulo}</div>
                <div className="livro-info">
                  <span className="livro-autor">{book.autor}</span>
                  <span className="livro-editora">{book.editora}</span>
                  <span className="livro-ano">{book.ano}</span>
                </div>
                <button className="livro-editar" onClick={() => toggleOptions(book.id)}>
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
                {showOptions[book.id] && (
                  <div className="opcoes-menu">
                    <Link to={`/CadastroLivro/${book.id}`} className="opcoes">Editar Livro</Link>
                    <Link to="/Exemplares" className="opcoes">Visualizar Exemplares</Link>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListagemLivros;