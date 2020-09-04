import { select, put, all } from 'redux-saga/effects'
import * as Eff from 'redux-saga/effects'
import { SignInFormData } from 'types/app'
import api from 'services/api'

function* signInUser(data: SignInFormData) {
  const signInResponse = yield api.post('/auth', data)
}

function* signUpUser() {}

const takeLatest: any = Eff.takeLatest
export default all([
  takeLatest('@user/SIGNIN_REQUEST', signInUser),
  takeLatest('@user/SIGNUP_REQUEST', signUpUser),
])
