import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { parseISO, format, formatRelative, formatDistance, parse } from 'date-fns';

import { useAuth } from '../../contexts/auth';

import api from '../../services/api';
import pt from 'date-fns/locale/pt';

import Header from '../../components/Header';
import Select from '../../components/Select';

import './styles.css';
import 'react-toastify/dist/ReactToastify.css';

function AddProject() {
  const history = useHistory();
  const { user } = useAuth();
  
  const emptyNotification = () => toast.error('Um dos campos podem estar vazio, verifique');
  const createdProject = (name: string) => toast.success(`O projeto ${name} foi criado com sucesso!`)
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [viability, setViability] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [expectedFinishDate, setExpectedFinishDate] = useState('');
  
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (name === '' || description === '' || viability === '' || status === '' || startDate === '' || expectedFinishDate === '') {
      emptyNotification();
      return;
    }
   
    console.log(user);

    let startDateUTC = new Date(startDate);
    let expectedFinishDateUTC = new Date(expectedFinishDate);

    const data = {
      name,
      description,
      viability,
      status,
      // startDate: ,
      start_date: String(startDateUTC.toISOString()),
      expected_finished_date: String(expectedFinishDateUTC.toISOString()),
      responsible: user?.id,
    };

    console.log(data);

    const response = await api.post('project', data);
    console.log(response.data);

    createdProject(response.data.res.name);

    await new Promise(resolve => setTimeout(resolve, 3000));

    let answer = window.confirm('Você gostaria de adicionar outro projeto?')

    if (answer) {
      setName('');
      setDescription('');
      setViability('');
      setStatus('');
      setStartDate('');
      setExpectedFinishDate('');
    } else {
      history.goBack();
    }

    // const parsedStartDate = parseISO(data.startDate);
    // const parsedExpectedDate = parseISO(data.expectedFinishDate);

    // const distance = formatDistance(
    //   parsedStartDate,
    //   parsedExpectedDate,
    //   {
    //     locale: pt
    //   }
    // )

    // console.log(distance);
    
  }
  return (
    <div className="container-project animate-up delay-2">
      <Header headerTitle="Cadastre um Projeto" />
      <main>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados do Projeto</legend>
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
              <label htmlFor="description">Descrição</label>
              <textarea
                maxLength={250}
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <p>Máximo de caracteres: 250</p>
            </div>

            <div className="input-group">
              <div className="input-wrapper">
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
              <div className="input-wrapper">
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
            </div>

            <div className="input-group">
              <div className="input-wrapper">
                <label htmlFor="start_date">Data de Início</label>
                <input
                  type="date"
                  id="start_date"
                  name="start_date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                />
              </div>

              <div className="input-wrapper">
                <label htmlFor="expected_finish_date">Data de Conclusão</label>
                <input
                  type="date"
                  id="expected_finish_date"
                  name="expected_finish_date"
                  value={expectedFinishDate}
                  onChange={e => setExpectedFinishDate(e.target.value)}
                />
              </div>
            </div>
          </fieldset>
          <ToastContainer autoClose={3000} />
          <button
            className="button"
            title="Salvar Dados">Salvar</button>
        </form>
      </main>
    </div>
  );
}

export default AddProject;