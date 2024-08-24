import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "../styles/listagemLivros.css"

function ListagemLivros() {

  const [books] = useState([
    { id: 1, titulo: "O senhor dos anéis: O retorno do rei", autor: "J. R. R. Tolkien", editora: "Darkside", ano: "1955" },
    { id: 2, titulo: "Livro 2", autor: "Autor 2", editora: "Editora 2", ano: "Ano 2" },
    { id: 3, titulo: "Nome do Livro 3", autor: "Autor 3", editora: "Editora 3", ano: "Ano 3" },
    { id: 4, titulo: "Livro 4", autor: "Autor 4", editora: "Editora 4", ano: "Ano 4" },
    { id: 5, titulo: "Livro 4", autor: "Autor 4", editora: "Editora 4", ano: "Ano 4" },
    { id: 6, titulo: "Livro 4", autor: "Autor 4", editora: "Editora 4", ano: "Ano 4" },
    { id: 7, titulo: "Livro 4", autor: "Autor 4", editora: "Editora 4", ano: "Ano 4" },
    { id: 8, titulo: "Livro 4", autor: "Autor 4", editora: "Editora 4", ano: "Ano 4" },
    { id: 9, titulo: "Livro 4", autor: "Autor 4", editora: "Editora 4", ano: "Ano 4" },
    { id: 10, titulo: "Livro 4", autor: "Autor 4", editora: "Editora 4", ano: "Ano 4" },

  ]);
  
  const [showOptions, setShowOptions] = useState({});

  const toggleOptions = (bookId) => {
    setShowOptions((prevState) => ({
      ...prevState,
      [bookId]: !prevState[bookId],
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
          {books.map((book) => (
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
                    <Link to="/EditarLivro" className="opcoes">Editar Livro</Link>
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