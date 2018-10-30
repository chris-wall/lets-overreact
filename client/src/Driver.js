import React from 'react';
import MasterDetail from './MasterDetail';
import WaitSpinner from './WaitSpinner';
import { query, createDriver } from './Api';
import Alert from './Alert';

class CreateDriver extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: '', email: '' };
    this.handleInputChanged = this.handleInputChanged.bind(this);
    this.showDialog = this.showDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleInputChanged(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  showDialog() {
    document.getElementById('dialog__create-driver').showModal();
  }

  closeDialog(e) {
    if (typeof this.props.onClose === 'function') {
      this.props.onClose(e);
    }

    this.setState({}, () => document.getElementById('dialog__create-driver').close());
  }

  async submitForm() {
    let errors = null;
    await createDriver(this.state.name, this.state.email).catch(err => errors = err);
    this.closeDialog({ success: (errors === null), errors });
  }

  render() {
    return (
      <div>
        <button className="add-new-button" onClick={this.showDialog}>+</button>
        <dialog id="dialog__create-driver">
          <div className="dialog-container">
            <header className="flex-spaced">
              <h4>Create Driver</h4>
              <button className="close-button" onClick={this.closeDialog}>X</button>
            </header>
            <main>
              <div>
                <label htmlFor="name">Name</label>
                <input type="text" maxLength="255" name="name" id="name" value={this.state.name} onChange={this.handleInputChanged} required />
              </div>
              <div>
                <label htmlFor="email">Email Address</label>
                <input type="email" maxLength="255" name="email" id="email" value={this.state.email} onChange={this.handleInputChanged} required />
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

export default class DriverView extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      isLoaded: false,
      drivers: []
    };

    this.onCreateDialogClosed = this.onCreateDialogClosed.bind(this);
  }

  async loadData() {
    const qry = await query(`{
      drivers {
        key
        name
        email
      }
    }`);

    console.log('[Drivers::loadData] Data returned', qry.data);
    this.setState({ drivers: qry.data.drivers, isLoaded: true });
  }

  componentDidMount() {
    this.loadData();
  }

  onCreateDialogClosed(e) {
    if (e.success !== false) {
      this.setState({ showAlert: true, alert: { type: 'success', message: 'New Driver created successfully.' } }, () => this.loadData());
    }
    else {
      this.setState({ showAlert: true, alert: { type: 'error', message: 'Could not create new Driver.  API reported errors.' } }, () => console.error(e));
    }
  }

  render() {
    return (
      <div className="sub-container">
        <header className="sub-header">
          <h4>All Drivers</h4>
          { (this.state.showAlert === true ? <Alert type={this.state.alert.type} message={this.state.alert.message} /> : '') }
          <CreateDriver onClose={this.onCreateDialogClosed} />
        </header>
        <div className="sub-body">
        { (this.state.isLoaded ? <MasterDetail list={this.state.drivers} /> : <WaitSpinner message="Attempting to load Driver data from the API" />) }       
        </div>
      </div>
    );
  }
}
