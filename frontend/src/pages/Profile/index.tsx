import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';

import { useAuth } from '../../contexts/auth';

import api from '../../services/api';

import './styles.css';

function Profile() {
  const { user } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    async function loadUserData() {
      console.log(user?.id);

      const response = await api.get(`/user/${user?.id}`)

      console.log(response.data);

      setName(response.data.name);
      setEmail(response.data.email);
    }

    loadUserData();
  }, [])

  return (
    <div className="container-profile animate-up delay-2">
      <Header headerTitle="Meu Perfil" />

      <div className="profile-content">
        <aside className="card-profile">
          <img src="http://github.com/thereallucas98.png" alt="David Lucas" />
          <h2>{user?.name}</h2>

          <button>Salvar Dados</button>
        </aside>
        <main>
          <form action="">
            <fieldset>
              <legend>Dados do Perfil</legend>
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
                <label htmlFor="avatar">Link da foto</label>
                <input
                  placeholder="https://"
                  type="url"
                  id="avatar"
                  name="avatar"
                />
              </div>
            </fieldset>
          </form>
        </main>
      </div>
    </div>
  );
}

export default Profile;