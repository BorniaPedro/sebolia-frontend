import React, { useEffect, useState } from "react";
import "../styles/cadastroExemplar.css"

function ListarExemplar() {

    const [books, setBooks] = useState([]);
    const [livroSelecionado, setLivroSelecionado] = useState('');
    const [estadoSelecionado, setEstadoSelecionado] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');
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

    const validateUser = async() => {
        const usuario = await getSession();
        if(usuario?.role !== "admin"){
          alert("É necessário ser administrador para acessar essa tela");
          window.location.href = "http://localhost:3000/Login";
        }
    }

    useEffect(() => {
        validateUser();
        getLivros();
    }, []);

    const handleSalvar = (e) =>{
        e.preventDefault();

        console.log(livroSelecionado, estadoSelecionado, quantidade, preco)

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
                preco: preco,
                quantidade: quantidade,
            })
        })
        .then(async (response) => {
            if(!response.ok){
                const body = await response.json();
                alert(body.message);
                return;
            }

            alert("Exemplar salvo com sucesso!");
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
            <div className="cadastroExemplar-header">
                <h2>Cadastro<br/> de exemplar</h2>
            </div>
            <form className="cadastroExemplar-form">
                <p>Livro</p>
                <select className="exemplarInfo" 
                        value={livroSelecionado} 
                        onChange={(e) => setLivroSelecionado(e.target.value)}>
                    <option value="">Selecione</option>
                    {books.map((book) => (
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
                <input 
                    type="number" 
                    className="exemplarInfo" 
                    step="0.01" min="0" required
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}/>
                <button className="cadastroExemplar-button" onClick={handleSalvar}>Cadastrar Exemplar</button>
            </form>
        </div>
    );
}

export default ListarExemplar;