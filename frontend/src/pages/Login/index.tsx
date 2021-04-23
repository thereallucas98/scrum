import React from 'react';

import './styles.css';

import Photo from '../../assets/img/heloo.svg';

function Login() {
  function handleSubmit() {
    alert('')
  }
  return (
    <div className="container-login">
      <div />
      <section>
        <form action="">
          <fieldset>
            <legend>Realize o seu Login</legend>
            <div className="separator light"></div>

            <div className="input-wrapper">
              <label htmlFor="name">Email</label>
              <input type="text" id="email" name="email" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Senha</label>
              <input
                placeholder="***********"
                type="password"
                id="password"
                name="password"
              />
            </div>
          </fieldset>
          <button onClick={handleSubmit}>
            Acessar
            </button>
          <a href="/create-account">Não possui conta? Crie uma!</a>
        </form>
      </section>
    </div>
  );
}

export default Login;