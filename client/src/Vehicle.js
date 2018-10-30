import React from 'react';
import MasterDetail from './MasterDetail';
import WaitSpinner from './WaitSpinner';
import { query, createVehicle } from './Api';

class CreateVehicle extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      vin: '',
      year: '',
      make: '',
      model: '',
      driverId: ''
    };
    this.handleInputChanged = this.handleInputChanged.bind(this);
    this.showDialog = this.showDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  async componentDidMount() {
    const qry = await query(`{
      drivers {
        key
        name
      }
    }`);
    this.setState({ drivers: qry.data.drivers });
  }

  handleInputChanged(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  showDialog() {
    document.getElementById('dialog__create-vehicle').showModal();
  }

  closeDialog() {
    this.setState({}, () => document.getElementById('dialog__create-vehicle').close());
  }

  async submitForm() {
    console.log('Calling api', this.state);
    let errors = null;
    await createVehicle(this.state.vin, this.state.year, this.state.make, this.state.model, this.state.driverId).catch(err => errors = err);

    if (typeof this.props.onClose === 'function') {
      this.props.onClose({ success: (errors === null), errors });
    }

    this.closeDialog();

  }

  render() {
    return (
      <div>
        <button className="add-new-button" onClick={this.showDialog}>+</button>
        <dialog id="dialog__create-vehicle">
          <div className="dialog-container">
            <header className="flex-spaced">
              <h4>Create Vehicle</h4>
              <button className="close-button" onClick={this.closeDialog}>X</button>
            </header>
            <main>
              <div>
                <label htmlFor="vin">Vehicle Identification Number (VIN)</label>
                <input type="text" maxLength="17" pattern="[0-9A-Za-z]{17}" name="vin" id="vin" value={this.state.vin} onChange={this.handleInputChanged} required />
              </div>
              <div>
                <label htmlFor="year">Model Year</label>
                <input type="text" maxLength="4" pattern="[0-9]{4}" name="year" id="year" value={this.state.year} onChange={this.handleInputChanged} required />
              </div>
              <div>
                <label htmlFor="make">Make</label>
                <input type="text" maxLength="25" name="make" id="make" value={this.state.make} onChange={this.handleInputChanged} required />
              </div>
              <div>
                <label htmlFor="model">Model</label>
                <input type="text" maxLength="25" name="model" id="model" value={this.state.model} onChange={this.handleInputChanged} required />
              </div>
              <div>
                <label htmlFor="driverId">Primary Driver</label>
                <select name="driverId" id="driverId" value={this.state.driverId} onChange={this.handleInputChanged} required>
                  <option>-- Select Driver --</option>
                  {
                    (this.state.drivers || []).map(driver => <option key={driver.key} value={driver.key}>{driver.name}</option>)
                  }
                </select>
              </div>
            </main>
            <footer>
              <button className="dialog__button--cancel" onClick={this.closeDialog}>Cancel</button>
              <button className="dialog__button--ok" onClick={this.submitForm}>OK</button>
            </footer>
          </div>
        </dialog>
      </div>
    );
  }
}

export default class VehicleView extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      isLoaded: false,
      vehicles: []
    };

    this.onCreateDialogClosed = this.onCreateDialogClosed.bind(this);
  }

  async componentDidMount() {
    const qry = await query(`{
      vehicles {
        key
        vin
        name
        year
        make
        model
        driver {
          name
        }
      }
    }`);
    console.log('Data returned', qry.data);
    this.setState({ vehicles: qry.data.vehicles, isLoaded: true });
  }

  async onCreateDialogClosed(e) {
    if (e.success !== false) {
      const qry = await query(`{
        vehicles {
          key
          vin
          name
          year
          make
          model
          driver {
            name
          }
        }
      }`);
      this.setState({ vehicles: qry.data.vehicles, isLoaded: true });
    }
  }

  render() {
    return (
      <div className="sub-container">
        <header className="sub-header">
          <h4>All Vehicles</h4>
          <CreateVehicle onClose={this.onCreateDialogClosed} />
        </header>
        <div className="sub-body">
        { (this.state.isLoaded ? <MasterDetail list={this.state.vehicles} /> : <WaitSpinner message="Attempting to load Vehicle data from the API" />) }       
        </div>
      </div>
    );
  }
}
