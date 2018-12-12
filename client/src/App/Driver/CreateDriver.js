import React from 'react';
import { ActionTypes } from '../../State/Store';
import { connect } from 'react-redux';
import Dialog from '../Common/Dialog';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    createDriver: (driver) => dispatch({ type: ActionTypes.CREATE_DRIVER, driver })
});

class CreateDriver extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: '', email: '', dialogOpen: false };
    this.showDialog = this.showDialog.bind(this);
    this.handleInputChanged = this.handleInputChanged.bind(this);
    this.submitForm = this.submitForm.bind(this);
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
        const { name, email } = this.state;
        this.props.createDriver({ name, email });
        this.setState({ name: '', email: '' });
      } 
    });
  }

  render() {
    return (
      <div>
        <button className="add-new-button" onClick={this.showDialog}>&#43;</button>
        <Dialog id="create-driver__dialog" onClose={this.submitForm} title="Create Driver" open={this.state.dialogOpen}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" maxLength="255" name="name" id="name" value={this.state.name} onChange={this.handleInputChanged} pattern=".{3,255}" required />
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" maxLength="255" name="email" id="email" value={this.state.email} onChange={this.handleInputChanged} required />
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDriver);
