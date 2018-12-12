import React from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import './WaitSpinner.css';

/**
 * mapStateToProps is a function used by the connect middleware.
 * @param {Map} state - State from the Redux store.
 */
const mapStateToProps = (state = Map()) => ({
  show: (state.get('isLoading') === true)
});

/**
 * WaitSpinner hides partial loaded interface segments until an operation completes.
 */
export default connect(mapStateToProps)(({ show }) => (
  <div className="wait-spinner__container" style={ { display: (show === true ? 'block' : 'none') } }>
    <div className="wait-spinner">
      <h3>Loading</h3>
      <div className="spinner"></div>
    </div>
  </div>
));