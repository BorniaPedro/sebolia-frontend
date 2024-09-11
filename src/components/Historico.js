import React, { useState, useEffect } from "react";
import "../styles/historico.css"
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

function Historico() {
    const [transactions, setTransactions] = useState([]);

    const getHistorico = async () => {
      const url = `http://localhost:3500/historico`;
  
      const response = await fetch(url, {credentials: "include"});
    
      const json = await response.json();
      setTransactions(json);
    }
  
    const getSession = async () =>{
      const url = "http://localhost:3500/login/session";
  
      const response = await fetch(url, {credentials: "include"});
  
      const json = await response.json();
      return json.user;
    }
  
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
      getHistorico();
    }, []);

    return(
        <div className="historico-container">
          <div className="header">
            <Link to="/" className="voltar-button-historico">Voltar</Link>
            <h2 className="historico-titulo">Histórico do usuário</h2>
          </div>
            
            

            <table className="historico-table">
                <tbody>
                    {transactions.length > 0 && transactions.map((t, index) => (
                    <tr className="historico-info" key={index}>
                        <td className="historico-livroTitulo">{t.tituloLivro}</td>
                        <td className="historico-livroInfo">
                            <span className="historico-livroEstado">Estado: {t.estado}</span>
                            <span className="historico-livroPreco">Preço: R${t.preco}</span>
                            <span className="historico-livroData">Data: {new Date(t.data).toISOString().split('T')[0]}</span>
                            <span className={"historico-tipo " + (t.tipo === "Compra" ? "verde" : "vermelho")} >Tipo: <span>{t.tipo}</span></span>

                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>

        </div>

    )
}

export default Historico