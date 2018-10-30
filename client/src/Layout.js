import React from 'react';
import { NavLink } from 'react-router-dom';

export default ({ children }) => (
  <main>
    <header>
      <h3>
      Let's OverREACT
      </h3>
      <nav>
        <NavLink to="/" exact activeClassName="nav-active">Dashboard</NavLink>
        <NavLink to="/driver" activeClassName="nav-active">Drivers</NavLink>
        <NavLink to="/vehicle" activeClassName="nav-active">Vehicles</NavLink>
      </nav>
    </header>
    <article>
      { children }
    </article>
  </main>
);