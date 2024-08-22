import React, {useState} from "react";
import { Link } from "react-router-dom";
import "../styles/listagemLivros.css"

function ListagemLivros() {
    const [showOptions, setShowOptions] = useState(false);
    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    return(
        <div className="listagem-container"> 
            <div className="header">
                <h2 className="titulo">Listagem de Livros</h2>

                <Link to="/CadastroLivro" className="cadastro-livro">Cadastrar Livro</Link>
            </div>

            <table className="livro-table">
                <tr className="livro-container">
                    <td className="livro-titulo">Nome do Livro</td>
                    <td className="livro-autor">Autor</td>
                    <td className="livro-editora">Editora</td>
                    <td className="livro-ano">Ano</td>
                    <td>
                        <button onClick={toggleOptions}>Editar</button>
                        {showOptions && (
                            <div className="options-menu">
                                <button className="opcoes">Editar Livro</button>
                                <button className="opcoes">Visualizar Exemplares</button>
                            </div>
                        )}
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default ListagemLivros;