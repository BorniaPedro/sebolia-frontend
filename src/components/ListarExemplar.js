import React, {useState, useEffect} from "react";
import "../styles/listagemLivros.css";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { useLocation } from 'react-router-dom';

function ListarExemplar() {
  const [exemplares, setExemplares] = useState([]);
  const [user, setUser] = useState(null);
  const [livro, setLivro] = useState('');

  const location = useLocation();
  const param = location.search.split("=");

  const getExemplares = async () => {
    let livro;
    setLivro(livro);
    if(param && param[0] === "?livro"){
      livro = param[1];
    }

    const url = `http://localhost:3500/exemplar/?livroId=${livro}`;

    const response = await fetch(url, {credentials: "include"});
  
    const json = await response.json();
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
      Swal.fire({
        title: "É necessário estar logado para acessar essa tela",
        icon: "error",
      }).then(() =>{
        window.location.href = "http://localhost:3000/Login";
      });
    }
  }


  useEffect(() => {
    validateUser();
    getExemplares();
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const removerExemplar = async (livroId, estado) =>{
    const url = `http://localhost:3500/exemplar/?livroId=${livroId}&estado=${estado}`;

    fetch(url, {
        method: "Delete",
        credentials: "include"
    })
    .then(async (response) => {
      if(!response.ok){
        const body = await response.json();
        Swal.fire({
            title: `${body.message}`,
            icon: "error",
         });
     }

        getExemplares();
    });
  }

  return (
    <div className="listagem-container">
      <div className="header">
        <Link to="/ListagemLivros" className="voltar-button">Voltar</Link>
        <h2 className="titulo">Listagem de Exemplares</h2>
          <Link to="/CadastroExemplar" className="cadastro-exemplar">
            Cadastrar Exemplares
          </Link>
      </div>
      <table className="livro-table">
        <tbody>
          {exemplares.map((ex) => (
            <tr key={ex.livroId + ex.estado} className="livro-container">
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
                    <Link to={`/VendaLivro/?livro=${ex.livroId}&estado=${ex.estado}`} className="opcoes">Vender</Link>
                    <Link to={`/CompraLivro/?livro=${ex.livroId}&estado=${ex.estado}`} className="opcoes">Comprar</Link>
                    {user?.role === "admin" && (
                    <>
                      <Link to={`/CadastroExemplar/?livro=${ex.livroId}&estado=${ex.estado}`} className="opcoes">
                          Editar Exemplar
                      </Link>
                      <div onClick={() => removerExemplar(ex.livroId, ex.estado)} className="opcoes">
                        Remover Exemplar
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

export default ListarExemplar;
