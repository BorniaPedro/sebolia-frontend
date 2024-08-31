import React, {useState, useEffect} from "react";
import "../styles/listagemLivros.css";
import { Link } from "react-router-dom";

function ListarExemplar() {
  const [exemplares, setExemplares] = useState([]);
  const [user, setUser] = useState(null);

  const getExemplares = async () => {
    const url = "http://localhost:3500/exemplar";

    const response = await fetch(url, {credentials: "include"});
  
    const json = await response.json();
    console.log(json)
    setExemplares(json);
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


  useEffect(() => {
    //validateUser();
    getExemplares();
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="listagem-container">
      <div className="header">
        <h2 className="titulo">Listagem de Exemplares</h2>
          <Link to="/CadastroLivro" className="cadastro-livro">
            Cadastrar Exemplares
          </Link>
        
      </div>
      <table className="livro-table">
        <tbody>
          {exemplares.map((ex) => (
            <tr key={ex.livroId+ex.estadoConservacao} className="livro-container">
              <td colSpan="5">
                <div className="livro-titulo">{ex.livroTitulo} - {ex.estado}</div>
                <div className="livro-info">
                  <span className="livro-autor">Preço: R${ex.preco}</span>
                  <span className="livro-editora">Quantidade em Estoque: {ex.quantidade}</span>
                </div>
                <button className="livro-editar" onClick={() => toggleOptions(`${ex.livroId} - ${ex.estado}`)}>
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
                {showOptions[`${ex.livroId} - ${ex.estado}`] && (
                  <div className="opcoes-menu">
                    <Link to="/Comprar" className="opcoes">Comprar</Link>
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

export default ListarExemplar;
