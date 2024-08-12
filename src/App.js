import InputField from './components/InputField'

function App() {
  return (
    <div className="login-container">
      <h2 className="form-title"> Fazer o login </h2>

      <form action="#" className="login-form">
        <InputField type="text" placeholder="Usuário" icon="person" />
        <InputField type="password" placeholder="Senha" icon="lock"/>

        <a href="#" className="forgot-password">Esqueceu a senha?</a>

        <button className="login-button">Entrar</button>
      </form>
      
    </div>
  )
}

export default App