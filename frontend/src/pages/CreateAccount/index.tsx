import React, { useState, FormEvent } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api';

import './styles.css';

function CreateAccount() {
  const emptyNotification = () => toast.error('Um dos campos podem estar vazio, verifique');
  const hasUserNotify = (email: string, name: string) => toast.info(`O email: ${email} está cadastrado no usuário ${name}!`);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleCreate(e: FormEvent) {
    e.preventDefault();

    if (name === '' || email === '' || password === '') {
      emptyNotification();
      return;
    }

    const hasUser = await api.get(`get-user?email=${email}`);

    if (hasUser) {
      hasUserNotify(hasUser.data.res.email, hasUser.data.res.name);
    }

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