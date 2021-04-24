import React, { useState, useEffect } from 'react';

import Notification from '../../assets/img/alert-octagon.svg';
import AddProject from '../../assets/img/plus-24.svg';

import { useAuth } from '../../contexts/auth';

import Card, { Project } from '../../components/Card';

import './styles.css';
import api from '../../services/api';

function Home() {
  const { user } = useAuth();

  const [allProjects, setAllProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState('');
  const [developing, setDeveloping] = useState('');
  const [finished, setFinished] = useState('');

  useEffect(() => {
    async function loadData() {
      const response = await api.get(`projects/${user?.id}`);

      console.log(response.data);

      setTotalProjects(response.data.totalProjects);
      setDeveloping(response.data.totalDeveloping);
      setFinished(response.data.totalFinished);

      setAllProjects(response.data.total);
    }

    loadData();
  }, [allProjects, totalProjects, developing, finished])



  return (
    <div className="container">
      <header className="home-header">
        <section id="top" className="animate-up">
          <h2>Dashboard</h2>
          {/* <span id="notification">
            <img src={Notification} alt="Alert" />
            Você está em 0 projetos!
          </span> */}
          <a id="avatar-profile" href="/profile">
            <p>{user?.name}<span>Meu Perfil</span></p>
            <img src="https:github.com/thereallucas98.png" />
          </a>
        </section>

        <div className="separator-line"></div>

        <section id="summary" className="animate-up delay-1">
          <h2 className="sr-only">Informações</h2>

          <div className="info">
            <div className="total">
              <strong>{totalProjects}</strong>
              Projetos ao Total
            </div>
            <div className="in-progress">
              <strong>{developing}</strong>
              Em Desenvolvimento
            </div>
            <div className="finished">
              <strong>{finished}</strong>
              Concluído
            </div>
          </div>
          <a href="/add-project" className="button">
            <span>
              <img src={AddProject} alt="New Project" />
            </span>
            Adicionar um novo Projeto
          </a>
        </section>
      </header>

      <main className="animate-up delay-2">
        <h1 className="sr-only">Trabalhos</h1>

        <div className="cards">
          {allProjects.map((project: Project) => {
            return <Card key={project.id} project={project} />
          })

          }
        </div>
      </main>
    </div>
  );
}

export default Home;