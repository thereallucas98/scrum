import React, { FormEvent } from 'react';

import Header from '../../components/Header';
import Select from '../../components/Select';

import './styles.css';

function AddJob() {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    alert('oi')
  }
  return (
    <div className="container-project animate-up delay-2">
      <Header headerTitle="Cadastre um Projeto" />
      <main>
        <form id="form-job" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados do Projeto</legend>
            <div className="separator light"></div>

            <div className="input-wrapper">
              <label htmlFor="name">Nome</label>
              <input type="text" id="name" name="name" />
            </div>

            <div className="input-wrapper">
              <label htmlFor="description">Descrição</label>
              <textarea />
            </div>

            <div className="input-group">
              <div className="input-wrapper">
                <Select
                  name="type"
                  label="Viabilidade"
                  options={[
                    { value: 1, label: 'Visibilidade Baixa' },
                    { value: 2, label: 'Visibilidade Moderada Baixa' },
                    { value: 3, label: 'Visibilidade Moderada'},
                    { value: 4, label: 'Visibilidade Moderada Alta'},
                    { value: 5, label: 'Visibilidade Alta'}
                  ]}
                />
              </div>
              <div className="input-wrapper">
              <Select
                  name="type"
                  label="Situação"
                  options={[
                    { value: 0, label: 'Planejado' },
                    { value: 1, label: 'Em Desenvolvimento' },
                    { value: 2, label: 'Cancelado'},
                    { value: 3, label: 'Concluído'}
                  ]}
                />
              </div>
            </div>

            <div className="input-group">
              <div className="input-wrapper">
                <label htmlFor="start_date">Data de Início</label>
                <input
                  type="date"
                  id="start_date"
                  name="start_date" />
              </div>

              <div className="input-wrapper">
                <label htmlFor="expected_finish_date">Data de Conclusão</label>
                <input
                  type="date"
                  id="expected_finish_date"
                  name="expected_finish_date" />
              </div>
            </div>
          </fieldset>
          <button
            className="button"
            title="Salvar Dados">Salvar</button>
        </form>
      </main>
    </div>
  );
}

export default AddJob;