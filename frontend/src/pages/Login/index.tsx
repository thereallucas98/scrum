import React, { useState, FormEvent } from 'react';
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from '../../contexts/auth';

import './styles.css';

// import Photo from '../../assets/img/heloo.svg';

function Login() {
  const emptyFields = () => toast.error('Um dos campos podem estar vazio, verifique.');
  const errorNotification = () => toast.error('Algo deu errado no Login, fale com seu Administrador');

  const history = useHistory();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    if (email === '' || password === '') {
      emptyFields();
    }

    try {
      await signIn(email, password).then((resp) => {
        console.log(resp);

        history.push('/dashboard');
      }).catch((error) => {
        console.log("error", error);
      })
    } catch (error) {
      errorNotification();
      console.log(error);
      return;
    }
    // history.push('/dashboard');
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
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Senha</label>
              <input
                placeholder="***********"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </fieldset>
          <button className="button-access" onClick={handleLogin}>
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