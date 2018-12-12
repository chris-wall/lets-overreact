import React from 'react';
import MasterDetail from '../Common/MasterDetail';
import CreateVehicle from './CreateVehicle';

export default class VehicleView extends React.Component {
  render() {
    return (
      <div className="sub-container">
        <header className="sub-header">
          <h4>
            <i className="material-icons">drive_eta</i>
            <span>Vehicles</span>
          </h4>
          <CreateVehicle />
        </header>
        <div className="sub-body">
        <MasterDetail list={this.props.vehicles} />      
        </div>
      </div>
    );
  }
}
