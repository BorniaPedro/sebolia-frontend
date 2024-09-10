import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import "../styles/vendaLivro.css"
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { Link } from 'react-router-dom';


function CompraLivro() {

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
          Swal.fire({
            title: "É necessário estar logado para acessar essa tela",
            icon: "error",
          }).then(() =>{
            window.location.href = "http://localhost:3000/Login";
          });
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
                Swal.fire({
                    title: `${body.message}`,
                    icon: "error",
                 });
                return;
            }

            Swal.fire({
                title: "Compra realizada com sucesso!",
                icon: "success",
             }).then(() =>{
                 window.location.href = `http://localhost:3000/ListarExemplar/?livro=${livro.livroId}`;
             });

        });
    }

    return (
        <div className="vendaLivro-container">
            <Link to={`/ListarExemplar/?livro=${livro.livroId}`} className="voltar-button">Voltar</Link>
            <div className="vendaLivro-header">
                <h2>Compra de Livro</h2>
            </div>
            <form className="vendaLivro-form">
                <p>Livro</p>
                <input type="text" className="vendaInfo" readOnly defaultValue={livro.titulo}/>
                <p>Estado de conservação</p>
                <input type="text" className="vendaInfo" readOnly defaultValue={estado}/>
                <p>Preço</p>
                <input type="number" className="vendaInfo" step="0.01" min="0" defaultValue={preco} readOnly/>
                <button className="vendaLivro-button" onClick={handleSubmit}>Comprar Livro</button>
            </form>
        </div>
    );
}

export default CompraLivro;