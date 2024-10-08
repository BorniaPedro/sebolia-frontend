import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import "../styles/cadastroExemplar.css"
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { Link } from "react-router-dom";
import { NumericFormat } from 'react-number-format'

function ListarExemplar() {

    const [books, setBooks] = useState([]);
    const [livroSelecionado, setLivroSelecionado] = useState('');
    const [estadoSelecionado, setEstadoSelecionado] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');
    const [user, setUser] = useState(null);

    const location = useLocation();
    const params = new URLSearchParams(location.search.split('?')[1]);

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


    const validateUser = async() => {
        const usuario = await getSession();
        if(usuario?.role !== "admin"){
          Swal.fire({
            title: "É necessário ser administrador para acessar essa tela",
            icon: "error",
          }).then(() =>{
            window.location.href = "http://localhost:3000/Login";
          });
        }
      }

    useEffect(() => {
        validateUser();
        getLivros();
        getEditarExemplar();
    }, []);

    const getEditarExemplar = () =>{
        const livro = params.get('livro');
        const estado = params.get('estado');

        if(livro && estado){
            getExemplar(livro, estado);
        }

    }

    const getExemplar = async (livro, estado) => {
        const url = `http://localhost:3500/exemplar/unico/?livroId=${livro}&estado=${estado}`;

        const response = await fetch(url, {credentials: "include"});
    
        const json = await response.json();

        setLivroSelecionado(json.livroId);
        setEstadoSelecionado(json.estado);
        setPreco(json.preco);
        setQuantidade(json.quantidade);
    }

    const handleSalvar = (e) =>{
        e.preventDefault();

        const url = `http://localhost:3500/exemplar`;

        fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                livroId: livroSelecionado,
                estado: estadoSelecionado,
                preco: String(preco).replace('R$ ', '').replace(',', '.'),
                quantidade: quantidade,
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
                title: "Exemplar salvo com sucesso!",
                icon: "success",
            }).then(() => {
                clear();
                window.location.href = `http://localhost:3000/ListarExemplar/?livro=${livroSelecionado}`;
            });

        });
    }

    const clear = () =>{
        setEstadoSelecionado("");
        setLivroSelecionado("");
        setPreco("");
        setQuantidade("");
    };

    return (
        <div className="cadastroExemplar-container">
            <Link to={livroSelecionado ? `/ListarExemplar/?livro=${livroSelecionado}` : "/ListagemLivros"} className="voltar-button">Voltar</Link>
            <div className="cadastroExemplar-header">
                <h2>Cadastro<br/> de exemplar</h2>
            </div>
            <form className="cadastroExemplar-form">
                <p>Livro</p>
                <select className="exemplarInfo" 
                        value={livroSelecionado} 
                        onChange={(e) => setLivroSelecionado(e.target.value)}>
                    <option value="">Selecione</option>
                    {books.length > 0 && books.map((book) => (
                        <option value={book.id}>{book.titulo}</option>
                    ))}
                </select>
                <p>Estado de conservação</p>
                <select className="exemplarInfo" 
                        value={estadoSelecionado} 
                        onChange={(e) => setEstadoSelecionado(e.target.value)}>
                    <option value="">Selecione</option>
                    <option value="Novo">Novo</option>
                    <option value="Semi-Novo">Semi-Novo</option>
                    <option value="Usado">Usado</option>
                </select>
                <p>Quantidade</p> 
                <input type="number" 
                       className="exemplarInfo" 
                       step="0" min="0" 
                       required 
                       value={quantidade}
                       onChange={(e) => setQuantidade(e.target.value)}/>
                <p>Preço</p>
                <NumericFormat
                    className="exemplarInfo"
                    decimalSeparator=","
                    prefix="R$ "
                    decimalScale={2}
                    required
                    value={preco}
                    allowNegative={false}
                    onChange={(e) => {setPreco(e.target.value)}}
                />
                <button className="cadastroExemplar-button" onClick={handleSalvar}>Cadastrar Exemplar</button>
            </form>
        </div>
    );
}

export default ListarExemplar;