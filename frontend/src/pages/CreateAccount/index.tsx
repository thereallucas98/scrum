import React, { useState, FormEvent } from 'react';
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api';

import './styles.css';

function CreateAccount() {
  // const succeded = () => toast.success(`Opa! O seu cadastro foi realizado com sucesso no sistema.`);
  const emptyNotification = () => toast.error('Um dos campos podem estar vazio, verifique');
  const hasUserNotify = () => toast.warning(`Ops! Este e-mail já está cadastrado no sistema.`);

  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleCreate(e: FormEvent) {
    e.preventDefault();

    if (name === '' || email === '' || password === '') {
      emptyNotification();
      return;
    }

    // const hasUser = await api.get(`get-user?email=${email}`);

    // if (hasUser) {
    //   setEmail('');
    //   hasUserNotify(hasUser.data.res.email);
    // }

    const data = {
      name,
      email,
      password,
      can_create: true,
    };

    console.log(data);

    await api.post('user', data).then((res) => {
      console.log(res.data.name)
      alert('Opa! Seu cadastro foi realizado com sucesso');
        
      history.push('/');

    }).catch((error) => {
      hasUserNotify()
      console.log(error);
    })
  }

  return (
    <div className="create-account-container">
      <div />
      <section>
        <form>
          <fieldset>
            <legend>Realize o seu cadastro</legend>
            <div className="separator light"></div>

            <div className="input-wrapper">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

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
          <button className="button-create" onClick={handleCreate}>
            Cadastrar
            </button>
          <a href="/">Já possuo uma conta!</a>
        </form>
        <ToastContainer autoClose={3000} />
      </section>
    </div>
  );
}

export default CreateAccount;