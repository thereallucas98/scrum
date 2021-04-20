import React from 'react';

import DeleteJob from '../../assets/img/trash-24.svg';
import EditJob from '../../assets/img/edit-24.svg';

import './styles.css';

function Card() {
  return (
    <div className="card">
      <div className="id column sr-only">id</div>
      <div className="name column">Projeto Mobile</div>
      <div className="deadline column">
        <p>
          1 dia(s) para entregar
        </p>
      </div>
      <div className="amount column">
        1.000,00
      </div>
      <div className="status column">
        Em Desenvolvimento
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