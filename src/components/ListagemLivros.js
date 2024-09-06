import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "../styles/listagemLivros.css"

function ListagemLivros() {

  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);

  const getLivros = async () => {
    const url = "http://localhost:3500/livro";

    const response = await fetch(url, {credentials: "include"});
  
    const json = await response.json();
    setBooks(json);
  }

  const getSession = async () =>{
    const url = "http://localhost:3500/login/session";

    const response = await fetch(url, {credentials: "include"});

    const json = await response.json();
    setUser(json.user);
    return json.user;
  }
  
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

  const validateUser = async() => {
    const usuario = await getSession();
    if(!usuario){
      alert("É necessário estar logado para acessar essa tela");
      window.location.href = "http://localhost:3000/Login";
    }
  }

  const removerLivro = async (id) =>{
    const url = `http://localhost:3500/livro/${id}`;

    fetch(url, {
        method: "Delete",
        credentials: "include"
    })
    .then(async (response) => {
        if(!response.ok){
            const body = await response.json();
            alert(body.message);
            return;
        }

        getLivros();
    });
  }

  useEffect(() => {
    validateUser();
    getLivros();
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="listagem-container">
      <div className="header">
        <h2 className="titulo">Listagem de Livros</h2>
        {user?.role === "admin" &&
          <Link to="/CadastroLivro" className="cadastro-livro">
            Cadastrar Livro
          </Link>
        }
        
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
                    <Link to={`/ListarExemplar/?livro=${book.id}`} className="opcoes">Visualizar Exemplares</Link>
                    {user?.role === "admin" && (
                      <>
                        <Link to={`/CadastroLivro/?livro=${book.id}`} className="opcoes">
                          Editar Livro
                        </Link>
                        <div onClick={() => removerLivro(book.id)} className="opcoes">
                          Remover Livro
                        </div>
                      </>
                    )}
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