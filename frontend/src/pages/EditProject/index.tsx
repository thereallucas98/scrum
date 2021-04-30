import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';

import Trash from '../../assets/img/trash-24-white.svg';
import Select from '../../components/Select';

import './styles.css';
import api from '../../services/api';

interface ProjectParams {
  id: string;
}

function EditProject() {
  const params = useParams<ProjectParams>();
  const history = useHistory();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [viability, setViability] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    api.get(`project/${params.id}`).then(response => {
      setName(response.data.name);
      setDescription(response.data.description);
      setViability(response.data.viability);
      setStatus(response.data.status);
    })
  }, [params.id])

  async function handleEdit() {
    if (status === '2' || status === '3') {
      let date = new Date();

      let finishedDate = String(date.toISOString());

      const data = {
        status,
        description,
        viability,
        finished_date: finishedDate
      }

      try {
        console.log(data);
        await api.patch(`project/${params.id}`, data);
        history.push('/dashboard');
      } catch (error) {
        console.log(error);
      }
    }
  }


  async function handleDeleteProject() {
    const data = String(params.id);
    try {
      await api.delete(`project/${data}`)
      history.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container-edit-project animate-up delay-2">
      <Header headerTitle="Editar Projeto" />

      <div className="project-content">
        <aside className="card-project">
          <h2>{name}</h2>

          <button className="button" onClick={handleEdit}>Atualizar</button>
          <button
            className="button"
            title="Excluir Projeto" onClick={handleDeleteProject}>
            <img src={Trash} alt="Delete Button" />
          </button>
        </aside>
        <main>
          <form action="">
            <fieldset>
              <legend>Dados do Projeto</legend>
              <div className="separator light"></div>

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
            </fieldset>
          </form>
        </main>
      </div>
      <div className="card-logs">
          <table>
            <thead>
              <tr>
                <th>1</th>
              </tr>
            </thead>
          </table>
      </div>
    </div>
  );
}

export default EditProject;