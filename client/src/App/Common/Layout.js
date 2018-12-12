import React from 'react';
import { NavLink } from 'react-router-dom';
import WaitSpinner from './WaitSpinner';
import Alert from './Alert';
import './Layout.css';

export default ({ children }) => (
  <main>
    <header>
      <div className="title">
        <div className="logo"></div>
        <h1>Let's OverREACT</h1>    
      </div>
      <nav>
        <NavLink to="/" exact activeClassName="nav-active">
          <i className="material-icons">dashboard</i>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/driver" activeClassName="nav-active">
          <i className="material-icons">people</i>
          <span>Drivers</span>
        </NavLink>
        <NavLink to="/vehicle" activeClassName="nav-active">
          <i className="material-icons">drive_eta</i>
          <span>Vehicles</span>
        </NavLink>
      </nav>
    </header>
    <article>
      <WaitSpinner />
      { children }
      <Alert />
    </article>
  </main>
);