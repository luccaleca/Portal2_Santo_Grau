import React from 'react';
import { Link } from 'gatsby';

const Home = () => {
    return (
      <div>
        <h1>Bem-vindo à Home!</h1>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/visualizadorclientes">Visualizador de Clientes</Link>
          </li>
          <li>
            <Link to="/promocoes">Promoções</Link>
          </li>
        </ul>
      </div>
    );
};

export default Home;
