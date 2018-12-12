import React from 'react';
import { connect } from 'react-redux';
import { ActionTypes } from '../../State/Store';
import DriverView from './DriverView';

const mapStateToProps = (state = Map()) => ({
    drivers: state.get('drivers')
  });

const mapDispatchToProps = (dispatch) => ({
    loadDrivers: () => dispatch({ type: ActionTypes.FETCH_DRIVERS })
});

class DriverContainer extends React.Component {

    componentDidMount() {
        this.props.loadDrivers();
    }

    render() {
        console.log('[DriverContainer::render()] Rendering driver view with props', this.props);
        return <DriverView drivers={this.props.drivers} />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriverContainer);
