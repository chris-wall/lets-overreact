import React from 'react';
import Layout from './Common/Layout';
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Driver from './Driver';
import Vehicle from './Vehicle';

import { Provider } from 'react-redux';
import store from '../State/Store';

import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Route path="/" exact component={Dashboard} />
            <Route path="/driver" component={Driver} />
            <Route path="/vehicle" component={Vehicle} />
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }
}
