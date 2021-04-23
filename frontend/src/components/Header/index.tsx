import React from 'react';

import GoBack from '../../assets/img/back.svg';
import './styles.css';

interface HeaderProps {
  headerTitle: string;
}

const Header: React.FC<HeaderProps> = ({ headerTitle }) => {
  return(
    <header className="page-header inner">
        <a href="/dashboard" className="back">
          <img src={GoBack} alt="Voltar" />
        </a>
        <h1>{headerTitle}</h1>
        <span></span>
    </header>
  );
}

export default Header;