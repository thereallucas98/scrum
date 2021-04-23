import React from 'react';
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

// import Photo from '../../assets/img/heloo.svg';

function Login() {
  const history = useHistory();
  function handleSubmit() {
    history.push('/dashboard');
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
        <ToastContainer autoClose={3000} />
      </section>
    </div>
  );
}

export default Login;