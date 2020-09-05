import { put, all, call } from 'redux-saga/effects'
import * as Eff from 'redux-saga/effects'
import { SignInFormData, SignUpFormData } from 'types/app'
import api from 'services/api'
import { signInSuccess, signFailure, signInRequest } from './actions'

function* signInUser({ data }: { data: SignInFormData }) {
  try {
    const signInResponse = yield call(api.post, '/auth', data)

    const { user, token } = signInResponse.data
    yield put(signInSuccess(user, token))
  } catch (e) {
    yield put(signFailure(['Falha na autenticação, verifique seus dados']))
  }
}

function* signUpUser({ data }: { data: SignUpFormData }) {
  try {
    const signUpResponse = yield call(api.post, '/user', data)
    // const { email, password } = signUpResponse.data.user
    // const signInData = {
    //   email,
    //   password,
    // }
    // yield put(signInRequest(signInData))
  } catch (e) {
    yield put(signFailure(['Falha no cadastro, verifique seus dados']))
  }
}

const takeLatest: any = Eff.takeLatest
export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signInUser),
  takeLatest('@auth/SIGN_UP_REQUEST', signUpUser),
])
