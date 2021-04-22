import React from 'react';
import Header from '../../components/Header';

import './styles.css';

function Profile() {
  return (
    <div className="container-profile animate-up delay-2">
      <Header headerTitle="Meu Perfil" />

      <div className="profile-content">
        <aside className="card-profile">
          <img src="http://github.com/thereallucas98.png" alt="David Lucas" />
          <h2>David Lucas</h2>

          <button>Salvar Dados</button>
        </aside>
        <main>
          <form action="">
            <fieldset>
              <legend>Dados do Perfil</legend>
              <div className="separator light"></div>

              <div className="input-wrapper">
                <label htmlFor="name">Nome</label>
                <input type="text" id="name" name="name" />
              </div>
              <div className="input-wrapper">
                <label htmlFor="name">Email</label>
                <input type="text" id="email" name="email" />
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