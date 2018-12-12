import React from 'react';
import MasterDetail from '../Common/MasterDetail';
import CreateDriver from './CreateDriver';

export default class DriverView extends React.Component {
  render() {
      console.log('[DriverView::render()] Rendering with props: ', this.props);
    return (
      <div className="sub-container">
        <header className="sub-header">
          <h4>
            <i className="material-icons">people</i>
            <span>Drivers</span>
          </h4>
          <CreateDriver />
        </header>
        <div className="sub-body">
          <MasterDetail list={this.props.drivers} />     
        </div>
      </div>
    );
  }
}
