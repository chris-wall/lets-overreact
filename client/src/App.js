import React from 'react';
import Layout from './Layout';
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Driver from './Driver';
import Vehicle from './Vehicle';


export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Route path="/" exact component={Dashboard} />
          <Route path="/driver" component={Driver} />
          <Route path="/vehicle" component={Vehicle} />
        </Layout>
      </BrowserRouter>
    );
  }
}
