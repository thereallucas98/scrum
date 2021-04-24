import React, { useEffect, useState } from 'react';
import { parseISO, format, formatRelative, formatDistance, parse } from 'date-fns';

import pt from 'date-fns/locale/pt';

import DeleteJob from '../../assets/img/trash-24.svg';
import EditJob from '../../assets/img/edit-24.svg';

import './styles.css';

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
  const [time, setTime] = useState('');

  useEffect(() => {
    function loadTimer() {
      const parsedStartDate = parseISO(String(project.start_date));
      const parsedExpectedDate = parseISO(String(project.expected_finished_date));

      const distance = formatDistance(
        parsedStartDate,
        parsedExpectedDate,
        {
          locale: pt
        }
      );

      setTime(distance);
    }
    loadTimer();
  }, [])


  return (
    <div className="card">
      <div className="id column sr-only">id</div>
      <div className="name column">{project.name}</div>
      <div className="deadline column">
        <p>
          {time} para entregar
        </p>
      </div>
      {/* <div className="amount column">
        1.000,00
      </div> */}
      <div className="status column">
        { project.status === 0 ? <p>Planejado</p> : project.status === 1 ? <p>Em Desenvolvimento</p> : project.status === 2 ? <p>Cancelado</p> : <p>Concluído</p>
        }
      </div>
      
      <div className="actions column flex">
        <p className="sr-only">Ações</p>

        <button title="Editar Projeto">
          <img src={EditJob} alt="New Project" />
        </button>

        <button title="Excluir Projeto" className="delete">
          <img src={DeleteJob} alt="Delete Project" />
        </button>
      </div>

    </div>
  );
}

export default Card;