# Sebolia Frontend

O Sebolia Frontend é o frontend de um sebo online, permitindo aos usuários navegar, buscar e adquirir livros usados de forma simples e intuitiva.

# Sebolia Backend

- [backend](https://github.com/viictor1/Sebolia)

---

# Funcionalidades

- Catálogo de livros disponíveis

  - Exibe uma lista completa de livros disponíveis no sebo, permitindo facil navegação e busca.
 
- Exibição de detalhes do livro
  
  - Mostra informações detalhadas de cada livro, incluindo título, autor, preço, descrição e estado de conservação.
 
- Histórico de Transações
  
  - Mantém um registro completo de todas as transações realizadas, permitindo acompanhar compras e vendas de forma clara.
 
- Gerenciamento Simples de Livros e Exemplares

  - Facilita a adição, edição e remoção de livros e seus exemplares, tornando a administração do catálogo intuitiva.

- Compra e venda de livros
 
---

# Instalação

## Pré requisitos

Certifique-se de que você tenha as seguintes ferramentas instaladas:

- [docker](https://www.docker.com/)

## Git Clone

Siga os passos abaixo para rodar o projeto localmente:

1. Clone o repositório

```bash
git clone https://github.com/BorniaPedro/sebolia-frontend.git
```

2. Navegue até o diretório do projeto:

```bash
cd sebolia-frontend
```

3. Buildar a imagem
```bash
docker build -t sebolia-frontend .
```

4. Rodar o container
```bash
docker run -p 3000:3000 sebolia
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).





