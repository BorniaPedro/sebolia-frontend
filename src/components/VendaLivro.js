import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import "../styles/vendaLivro.css"

function VendaLivro() {

    const [livro, setLivro] = useState('');
    const [estado, setEstado] = useState('');
    const [preco, setPreco] = useState('');

    const location = useLocation();
    const params = new URLSearchParams(location.search.split('?')[1]);

    const getSession = async () =>{
        const url = "http://localhost:3500/login/session";

        const response = await fetch(url, {credentials: "include"});

        const json = await response.json();

        return json.user;
    }

    const validateUser = async() => {
        const usuario = await getSession();
        if(!usuario){
          alert("É necessário estar logado para acessar essa tela");
          window.location.href = "http://localhost:3000/Login";
        }
    }

    const getExemplar = async () =>{
        const livro = params.get('livro');
        const estado = params.get('estado');

        if(livro && estado){
            const url = `http://localhost:3500/exemplar/unico/?livroId=${livro}&estado=${estado}`;

            const response = await fetch(url, {credentials: "include"});
        
            const json = await response.json();

            setLivro({ livroId: json.livroId, titulo: json.livroTitulo});
            setEstado(json.estado);
            setPreco(json.preco);
        }
    }

    useEffect(() => {
        validateUser();
        getExemplar();
    }, []);

    const handleSubmit = (e) =>{
        e.preventDefault();

        const url = `http://localhost:3500/compra`;

        fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                livroId: livro.livroId,
                estado: estado
            })
        })
        .then(async (response) => {
            if(!response.ok){
                const body = await response.json();
                alert(body.message);
                return;
            }

            alert("Compra realizada com sucesso!");
        });
    }

    return (
        <div className="vendaLivro-container">
            <div className="vendaLivro-header">
                <h2>Venda de Livro</h2>
            </div>
            <form className="vendaLivro-form">
                <p>Livro</p>
                <input type="text" className="vendaInfo" readOnly defaultValue={livro.titulo}/>
                <p>Estado de conservação</p>
                <input type="text" className="vendaInfo" readOnly defaultValue={estado}/>
                <p>Preço</p>
                <input type="number" className="vendaInfo" step="0.01" min="0" defaultValue={preco} readOnly/>
                <button className="vendaLivro-button" onClick={handleSubmit}>Vender Livro</button>
            </form>
        </div>
    );
}

export default VendaLivro;