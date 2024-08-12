import React from 'react'
import App from './App'

function App() {
  return (
    <div className="login-container">
      <h2 className="form-title">Fazer o login</h2>

      <form action="#" className="login-form">
        <div className="input-wrapper">
          <input type="email" placeholder="Email" className="input" required />
          <i class="material-symbols-rounded">mail</i>
        </div>
      </form>
      
    </div>
  )
}

export default App 