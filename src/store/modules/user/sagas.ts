import { select, put, all, call } from 'redux-saga/effects'
import * as Eff from 'redux-saga/effects'
import api from 'services/api'
import { RootState } from '../rootReducer'

function* updateViewer({ data }: any) {
  // const { user } = yield select((state: RootState) => state.user)
  // const response = yield api.patch(`/user/${user.id}`, data)
}

const { takeLatest } = Eff
export default all([takeLatest('@user/UPDATE_USER_REQUEST', updateViewer)])
