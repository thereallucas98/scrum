import React from 'react';

import Notification from '../../assets/img/alert-octagon.svg';
import AddProject from '../../assets/img/plus-24.svg';

import Card from '../../components/Card';

import './styles.css';

function Home() {
  return (
    <div className="container">
      <header>
        <section id="top">
          <h2>Dashboard</h2>
          <span id="notification">
            <img src={Notification} alt="Alert" />
            Você está em 0 projetos!
          </span>
          <a id="avatar-profile">
            <p>David Lucas<span>Meu Perfil</span></p>
            <img src="https:github.com/thereallucas98.png" />
          </a>
        </section>

        <div className="separator-line"></div>

        <section id="summary">
          <h2 className="sr-only">Informações</h2>

          <div className="info">
            <div className="total">
              <strong>12</strong>
              Projetos ao Total
            </div>
            <div className="in-progress">
              <strong>7</strong>
              Em Desenvolvimento
            </div>
            <div className="finished">
              <strong>4</strong>
              Concluído
            </div>
          </div>
          <a href="" className="button">
            <span>
              <img src={AddProject} alt="New Project" />
            </span>
            Adicionar um novo Projeto
          </a>
        </section>
      </header>

      <main>
        <h1 className="sr-only">Trabalhos</h1>

        <div className="cards">
          <Card />
        </div>
      </main>
    </div>
  );
}

export default Home;