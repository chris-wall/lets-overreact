import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import { fetchVehicles, createVehicle } from './Vehicles';
import { fetchDrivers, createDriver } from './Drivers';
import { ActionTypes } from '../Store';

function* watchFetchVehicles() {
    yield takeLatest(ActionTypes.FETCH_VEHICLES, fetchVehicles);
}

function* watchFetchDrivers() {
    yield takeLatest(ActionTypes.FETCH_DRIVERS, fetchDrivers);
}

function* watchCreateDriver() {
    yield takeEvery(ActionTypes.CREATE_DRIVER, createDriver);
}

function* watchCreateVehicle() {
    yield takeEvery(ActionTypes.CREATE_VEHICLE, createVehicle);
}

export default function* rootSaga() {
    yield all([
      watchFetchVehicles(),
      watchFetchDrivers(),
      watchCreateDriver(),
      watchCreateVehicle(),
    ]);
}