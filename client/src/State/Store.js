import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './Sagas';
import { Map } from 'immutable';

const ActionTypes = {
    FETCH_DRIVERS: 'FETCH_DRIVERS',
    FETCH_DRIVERS_COMPLETE: 'FETCH_DRIVERS_COMPLETE',
    FETCH_DRIVERS_ERROR: 'FETCH_DRIVERS_ERROR',
    CREATE_DRIVER: 'CREATE_DRIVER',
    CREATE_DRIVER_COMPLETE: 'CREATE_DRIVER_COMPLETE',
    CREATE_DRIVER_ERROR: 'CREATE_DRIVER_ERROR',
    FETCH_VEHICLES: 'FETCH_VEHICLES',
    FETCH_VEHICLES_COMPLETE: 'FETCH_VEHICLES_COMPLETE',
    FETCH_VEHICLES_ERROR: 'FETCH_VEHICLES_ERROR',
    CREATE_VEHICLE: 'CREATE_VEHICLE',
    CREATE_VEHICLE_COMPLETE: 'CREATE_VEHICLE_COMPLETE',
    CREATE_VEHICLE_ERROR: 'CREATE_VEHICLE_ERROR',
};

function reducer(state = Map(), action = {}) {
    switch(action.type.toUpperCase()) {
        case ActionTypes.FETCH_DRIVERS:
        case ActionTypes.FETCH_VEHICLES:
        case ActionTypes.CREATE_DRIVER:
        case ActionTypes.CREATE_VEHICLE:
            console.log('[REDUCER]: fetch has begun', action);
            return state.set('isLoading', true);

        case ActionTypes.FETCH_VEHICLES_COMPLETE:
            console.log('[REDUCER]: fetch vehicles is completed', action);
            return state.set('vehicles', action.vehicles).set('isLoading', false);

        case ActionTypes.FETCH_DRIVERS_COMPLETE:
            console.log('[REDUCER]: fetch drivers is completed', action);
            return state.set('drivers', action.drivers).set('isLoading', false);

        case ActionTypes.CREATE_DRIVER_COMPLETE:
            return state.set('isLoaded', false)
            .set('alert', { message: 'A new Driver has been added!', type: 'info', key: Date.now() });

        case ActionTypes.CREATE_VEHICLE_COMPLETE:
            return state.set('isLoaded', false)
            .set('alert', { message: 'A new Vehicle has been added!', type: 'info', key: Date.now() });

        case ActionTypes.FETCH_DRIVERS_ERROR:
        case ActionTypes.FETCH_VEHICLES_ERROR:
        case ActionTypes.CREATE_DRIVER_ERROR:
        case ActionTypes.CREATE_VEHICLE_ERROR:
            console.error(`[REDUCER] ${action.type} ERROR:`, action.error);
            return state.set('isLoading', false)
            .set('alert', { message: 'An error has occurred!', type: 'error', key: Date.now() });

        default:
            return state;
    }
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;

export { ActionTypes };
