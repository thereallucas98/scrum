import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

// import Notification from '../../assets/img/alert-octagon.svg';
import AddProject from '../../assets/img/plus-24.svg';

import { useAuth } from '../../contexts/auth';

import Card, { Project } from '../../components/Card';
import Select from '../../components/Select';

import './styles.css';
import api from '../../services/api';

function Home() {
  const { user } = useAuth();

  const history = useHistory();

  const [allProjects, setAllProjects] = useState([]);
  const [filterProjects, setFiltersProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState('');
  const [developing, setDeveloping] = useState('');
  const [finished, setFinished] = useState('');

  const [displayProject, setDisplayProject] = useState(true);

  const [status, setStatus] = useState('');
  const [viability, setViability] = useState('');
  // const [startDate, setStartDate] = useState('');

  useEffect(() => {
    async function loadData() {
      const response = await api.get(`projects/${user?.id}`);

      // console.log(response.data);

      setTotalProjects(response.data.totalProjects);
      setDeveloping(response.data.totalDeveloping);
      setFinished(response.data.totalFinished);

      setAllProjects(response.data.total);
    }

    loadData();
  }, [allProjects, totalProjects, developing, finished])

  function handleGoProfile() {
    history.push(`/profile/${user?.id}`)
  }

  function handleClear() {
    setViability('');
    setStatus('');

    setDisplayProject(true);
  }

  async function handleFilter() {
    console.log(status);
    console.log(viability);
    // console.log(startDate);
    // let startDateFilter = new Date(startDate);
    // console.log(String(startDateFilter.toISOString()))

    const statusFitler = status === '' ? undefined : Number(status);
    const viabilityFilter = viability === '' ? undefined : Number(viability);

    const response = await api.get(`/filter/${user?.id}?status=${statusFitler}&viability=${viabilityFilter}`)

    console.log(response);

    setFiltersProjects(response.data.total);

    setDisplayProject(false);
  }

  return (
    <div className="container">
      <header className="home-header">
        <section id="top" className="animate-up">
          <h2>Dashboard</h2>
          {/* <span id="notification">
            <img src={Notification} alt="Alert" />
            Você está em 0 projetos!
          </span> */}
          <a id="avatar-profile" onClick={handleGoProfile}>
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
        <div className="search-groups">
          <div className="select-group">
            <div className="select-wrapper">
              <Select
                name="type"
                label="Viabilidade"
                options={[
                  { value: 1, label: 'Visibilidade Baixa' },
                  { value: 2, label: 'Visibilidade Moderada Baixa' },
                  { value: 3, label: 'Visibilidade Moderada' },
                  { value: 4, label: 'Visibilidade Moderada Alta' },
                  { value: 5, label: 'Visibilidade Alta' }
                ]}
                value={viability}
                onChange={e => setViability(e.target.value)}
              />
            </div>
            <div className="select-wrapper">
              <Select
                name="type"
                label="Situação"
                options={[
                  { value: 0, label: 'Planejado' },
                  { value: 1, label: 'Em Desenvolvimento' },
                  { value: 2, label: 'Cancelado' },
                  { value: 3, label: 'Concluído' }
                ]}
                value={status}
                onChange={e => setStatus(e.target.value)}
              />
            </div>
            {/* <div className="select-wrapper">
              <label htmlFor="start_date">Data de Início</label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
            </div> */}
            <div className="select-wrapper">
              <span></span>
              <button className="button" onClick={handleFilter}>
                Filtrar
              </button>
            </div>

            <div className="select-wrapper">
              <span></span>
              <button className="button delete" onClick={handleClear}>
                Limpar
              </button>
            </div>
          </div>
        </div>

        <h1 className="sr-only">Trabalhos</h1>

        <div className="cards">
          {
            displayProject === true ? (
              allProjects.map((project: Project) => {
                return <Card key={project.id} project={project} />
              })
            ) : (
              filterProjects.map((project: Project) => {
                return <Card key={project.id} project={project} />
              })
            )
          }
        </div>
      </main>
    </div>
  );
}

export default Home;