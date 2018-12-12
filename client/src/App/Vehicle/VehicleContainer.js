import React from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { ActionTypes } from '../../State/Store';
import VehicleView from './VehicleView';

const mapStateToProps = (state = Map()) => ({
    vehicles: state.get('vehicles')
});

const mapDispatchToProps = (dispatch) => ({
    loadVehicles: () => dispatch({ type: ActionTypes.FETCH_VEHICLES })
});

class VehicleContainer extends React.Component {

    componentDidMount() {
        this.props.loadVehicles();
    }

    render() {
        return <VehicleView vehicles={this.props.vehicles} />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleContainer);
