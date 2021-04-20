import React from 'react';
import './styles.css';

function Card() {
  return (
    <div className="card">
      <div className="name column">Projeto Mobile</div>
      <div className="deadline column">
        <span>Prazo</span>
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

    </div>
  );
}

export default Card;