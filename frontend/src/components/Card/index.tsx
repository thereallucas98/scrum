import React, { useEffect, useState } from 'react';
import { parseISO, format, formatRelative, formatDistance, parse } from 'date-fns';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import pt from 'date-fns/locale/pt';

import Confirm from '../../assets/img/check-square.svg';
import DeleteJob from '../../assets/img/trash-24.svg';
import EditJob from '../../assets/img/edit-24.svg';
import Lock from '../../assets/img/lock.svg';

import './styles.css';
import Select from '../Select';

export interface Project {
  id: string;
  name: string;
  description: string;
  viability: number;
  status: number;
  start_date: Date;
  expected_finished_date: Date;
  finished_date: Date;
  user: Object
}

export interface ProjectItemProps {
  project: Project;
}

const Card: React.FC<ProjectItemProps> = ({ project }) => {
  const history = useHistory();

  const [changeStatusBoolean, setChangeStatusBoolean] = useState(false);
  const [status, setStatus] = useState(String(project.status));
  const [time, setTime] = useState('');
  const [notStarted, setNotStarted] = useState(false);
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    function loadTimer() {
      // const parsedStartDate = parseISO(String(project.start_date));
      // console.log('oi')
      // console.log(typeof(project.status))
      // console.log(project.finished_date)
      let isBigger = true ? parseISO(String(project.start_date)) >= new Date() : false;

      if ((project.status === 2 || project.status === 3) && project.finished_date != null) {
        console.log(project.finished_date)
        const finished = parseISO(String(project.finished_date));

        const daysGone = formatDistance(
          finished,
          new Date(),
          {
            locale: pt
          }
        )

        setEndDate(daysGone);
      } else if (isBigger) {
        setNotStarted(isBigger);
      }

      const parsedExpectedDate = parseISO(String(project.expected_finished_date));


      const distanceActive = formatDistance(
        parsedExpectedDate,
        new Date(),
        {
          locale: pt
        }
      );

      setTime(distanceActive);
    }
    loadTimer();
  }, [])

  // useEffect(() => {
  //   if (changeStatusBoolean) {
  //     handleChange()
  //   }
  // }, [status])

  async function handleChange() {

    if (status === '2' || status === '3') {
      let date = new Date();

      let finishedDate = String(date.toISOString());

      const data = {
        status,
        description: project.description,
        viability: project.viability,
        finished_date: finishedDate
      }

      try {
        console.log(data);
        await api.patch(`project/${project.id}`, data);

        setChangeStatusBoolean(false);

        // setChangeStatusBoolean
      } catch (error) {
        console.log(error);
      }
    }

    const data = {
      status,
      description: project.description,
      viability: project.viability,
      finished_date: null
    }

    try {
      console.log(data);
      await api.patch(`project/${project.id}`, data);

      setChangeStatusBoolean(false);

      // setChangeStatusBoolean
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteProject() {
    const data = String(project.id);
    try {
      await api.delete(`project/${data}`);
    } catch (error) {
      console.log(error);
    }
  }

  function handleEdit() {
    history.push(`/project/${project.id}`);
  }

  return (
    <div className={project.viability === 5 ? "card gold-border" : "card"}>
      <div className="id column sr-only">id</div>
      <div className="name column">{project.name}</div>
      <div className="deadline column">
        {
          project.status === 3 || project.status === 2 ?
            <p style={{ color: '#EB3B35', textDecoration: 'line-through' }}>{endDate} <br />que foi {project.status === 2 ? 'Cancelado' : 'Concluído'}</p> :
          notStarted === true ? <p>Ainda não Iniciou</p> : <p>
          {time} <br />para entregar
    </p>
        }
      </div>
      {/* <div className="amount column">
        1.000,00
      </div> */}
      {
        project.status === 2 || project.status === 3 ? (
          <div className="status column" onClick={() => { setChangeStatusBoolean(true) }}>
            {
              project.status === 2 ? <p>Cancelado</p> : <p>Concluído</p>
            }
          </div>
        ) : changeStatusBoolean === false ? (
          <div style={{ cursor: 'pointer' }} className="status column" onClick={() => { setChangeStatusBoolean(true) }}>
            {
              project.status === 0 ? <p>Planejado</p> : <p>Em Desenvolvimento</p>
            }
          </div>
        ) : (
          <div className="status column select-box">
            <Select
              name="type"
              label=""
              options={[
                { value: 0, label: 'Planejado' },
                { value: 1, label: 'Em Desenvolvimento' },
                { value: 2, label: 'Cancelado' },
                { value: 3, label: 'Concluído' }
              ]}
              value={status}
              onChange={e => {
                setStatus(e.target.value);
              }}
            />
            <img src={Confirm} alt="Delete Project" onClick={handleChange} />
          </div>
        )
      }


      <div className="actions column flex">
        <p className="sr-only">Ações</p>
        {project.status === 2 || project.status === 3 ?
          (
            <button title="Projeto não pode ser Editado" className="button">
              <img src={Lock} alt="New Project" />
            </button>
          ) :

          (
            <button title="Editar Projeto" className="button" onClick={handleEdit}>
              <img src={EditJob} alt="New Project" />
            </button>

          )
        }
        <button title="Excluir Projeto" className="delete button" onClick={handleDeleteProject}>
          <img src={DeleteJob} alt="Delete Project" />
        </button>
      </div>

    </div>
  );
}

export default Card;