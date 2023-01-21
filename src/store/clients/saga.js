import { call, put, takeEvery } from "redux-saga/effects";

import {
  GET_CLIENTS,
  GET_CLIENT_PROFILE,
  ADD_NEW_CLIENT,
  DELETE_CLIENT,
  UPDATE_CLIENT,
} from "./actionTypes";

import {
  getClientsSuccess,
  getClientsFail,
  getClientProfileSuccess,
  getClientProfileFail,
  addClientFail,
  addClientSuccess,
  updateClientSuccess,
  updateClientFail,
  deleteClientSuccess,
  deleteClientFail,
} from "./actions";

import { getClients } from "../../helpers/backend_helper";

//Include Both Helper File with needed methods
import { del, get, post, update } from "../../helpers/api_helper";
import * as url from "../../helpers/url_helper";

function* fetchClients() {
  try {
    const response = yield call(getClients);
    yield put(getClientsSuccess(response));
  } catch (error) {
    yield put(getClientsFail(error));
  }
}

function* fetchClientProfile() {
  try {
    const response = yield call(get(url.GET_CLIENT_PROFILE));
    yield put(getClientProfileSuccess(response));
  } catch (error) {
    yield put(getClientProfileFail(error));
  }
}

function* onUpdateClient({ payload: client }) {
  try {
    const response = yield call(update(url.UPDATE_CLIENT, client), client);
    yield put(updateClientSuccess(response));
  } catch (error) {
    yield put(updateClientFail(error));
  }
}

function* onDeleteClient({ payload: client }) {
  try {
    const response = yield call(
      del(url.DELETE_CLIENT, { headers: { client } }),
      client
    );
    yield put(deleteClientSuccess(response));
  } catch (error) {
    yield update(deleteClientFail(error));
  }
}

function* onAddNewClient({ payload: client }) {
  try {
    const response = yield call(post(url.ADD_NEW_CLIENT, client), client);

    yield put(addClientSuccess(response));
  } catch (error) {
    yield put(addClientFail(error));
  }
}

function* clientsSaga() {
  yield takeEvery(GET_CLIENTS, fetchClients);
  yield takeEvery(GET_CLIENT_PROFILE, fetchClientProfile);
  yield takeEvery(ADD_NEW_CLIENT, onAddNewClient);
  yield takeEvery(UPDATE_CLIENT, onUpdateClient);
  yield takeEvery(DELETE_CLIENT, onDeleteClient);
}

export default clientsSaga;
