/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import destkoptimg from '../../assets/desktop_3.jpg';

export default function Logon() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const history = useHistory();

  async function handleLogon(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { email, password });

      const { token } = response.data;

      localStorage.setItem('sessionId', token);

      console.log(response.data);

      // history.push('/profile');
    } catch (err) {
      alert('Falha no login, tente novamente.');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <form onSubmit={handleLogon}>
          <h1>Faça seu logon</h1>

          <input
            type="email"
            value={email}
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
          />

          <input
            type="password"
            value={password}
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
          />

          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#2ecc71" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img className="LogonImg" src={destkoptimg} alt="" srcSet="" />
    </div>
  );
}
