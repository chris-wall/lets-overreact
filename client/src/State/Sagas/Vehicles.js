import { put, call } from 'redux-saga/effects';
import { ActionTypes } from '../Store';
import { query, createVehicle as create } from '../Api';

export function* fetchVehicles() {
    try {
        const qry = yield call(query, `{
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

        yield put({ type: ActionTypes.FETCH_VEHICLES_COMPLETE, vehicles: qry.data.vehicles });
    }
    catch (error) {
        yield put({ type: ActionTypes.FETCH_VEHICLES_ERROR, error });
    }
}

export function* createVehicle({ vehicle }) {
    try {
        yield call(create, vehicle);
        yield put({ type: ActionTypes.CREATE_VEHICLE_COMPLETE });
        yield fetchVehicles();
    }
    catch(error) {
        yield put({ type: ActionTypes.CREATE_VEHICLE_ERROR, error });
    }
}