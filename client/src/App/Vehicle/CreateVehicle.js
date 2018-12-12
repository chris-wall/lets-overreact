import React from 'react';
import { ActionTypes } from '../../State/Store';
import { connect } from 'react-redux';
import Dialog from '../Common/Dialog';

const mapStateToProps = (state) => ({
    drivers: state.get('drivers')
});

const mapDispatchToProps = (dispatch) => ({
    createVehicle: (vehicle) => dispatch({ type: ActionTypes.CREATE_VEHICLE, vehicle }),
    loadDrivers: () => dispatch({ type: ActionTypes.FETCH_DRIVERS }),
});

class CreateVehicle extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      vin: '',
      year: '',
      make: '',
      model: '',
      driverId: '',
      dialogOoen: false,
    };

    this.showDialog = this.showDialog.bind(this);
    this.handleInputChanged = this.handleInputChanged.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    this.props.loadDrivers();
  }

  handleInputChanged(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  showDialog() {
    this.setState({ dialogOpen: true });
  }

  submitForm(args) {
    this.setState({ dialogOpen: false }, () => {
      if (args.canceled !== true) {
        const { vin, year, make, model, driverId } = this.state;
        this.props.createVehicle({ vin, year, make, model, driverId });
        this.setState({ vin: '', year: '', make: '', model: '', driverId: '' });
      } 
    });
  }

  render() {
    return (
      <div>
        <button className="add-new-button" onClick={this.showDialog}>+</button>
        <Dialog id="create-vehicle__dialog" onClose={this.submitForm} title="Create Vehicle" open={this.state.dialogOpen} className="dialog-lg">
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
                (this.props.drivers || []).map(driver => <option key={driver.key} value={driver.key}>{driver.name}</option>)
              }
            </select>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateVehicle);