import React from 'react';

import './styles.css';

function Home() {
  return (
    <div className="container">
      <header>
        <section id="top">
          <h2>Dashboard</h2>
          <span id="notification">
            Você está em 0 projetos!
          </span>
          <a id="avatar-profile">
            <p>David Lucas<span>Meu Perfil</span></p>
            <img src="https:github.com/thereallucas98.png" />
          </a>
        </section>

        <div className="separator-line"></div>

        <section>
          <h1>Oi</h1>
        </section>
      </header>
    </div>
  );
}

export default Home;