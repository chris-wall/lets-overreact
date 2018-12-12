import { put, call } from 'redux-saga/effects';
import { query, createDriver as create } from '../Api';
import { ActionTypes } from '../Store';

export function* fetchDrivers() {
    try {
        const qry = yield call(query, `{
            drivers {
                key
                name
                email
            }
        }`); 
    
        yield put({ type: ActionTypes.FETCH_DRIVERS_COMPLETE, drivers: qry.data.drivers });
    }
    catch(error) {
        yield put({ type: ActionTypes.FETCH_DRIVERS_ERROR, error });
    }
}

export function* createDriver({ driver }) {
    try {
        yield call(create, driver);
        yield put({ type: ActionTypes.CREATE_DRIVER_COMPLETE });
        yield fetchDrivers();
    }
    catch(error) {
        yield put({ type: ActionTypes.CREATE_DRIVER_ERROR, error });
    }
}