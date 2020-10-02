import { put, all, delay } from 'redux-saga/effects'
import * as Eff from 'redux-saga/effects'
import { IUser, SignInFormData, SignUpFormData } from 'types/app'
import api from 'services/api'
import {
  signInSuccess,
  signFailure,
  signInRequest,
  getUserAddressSuccess,
} from './actions'
import { RootState } from '../rootReducer'
import { AxiosError, AxiosResponse } from 'axios'

const delayToCleanErrors = 4000

function* signInUser({ data }: { data: SignInFormData }) {
  try {
    let signInData: any

    yield api
      .post('/auth', data)
      .then((response: AxiosResponse) => {
        signInData = response.data
      })
      .catch((reason: AxiosError) => {
        put(signFailure(reason.response?.data.errors))
      })

    const { user, token } = signInData

    yield getUserAddress(user, token)
    yield put(signInSuccess(user, token))
  } catch (e) {
    yield put(signFailure(['Falha na autenticação, verifique seus dados']))
    yield delay(delayToCleanErrors, true)
    yield put(signFailure(null))
  }
}

function* getUserAddress(user: IUser, token: string) {
  try {
    let signInAddressData: any

    api.defaults.headers.Authorization = token
    yield api
      .get(`/user/${user.id}/address`)
      .then((response: AxiosResponse) => {
        signInAddressData = response.data.addresses
      })
      .catch((reason: AxiosError) => {
        put(signFailure(reason.response?.data.errors))
      })
    yield put(getUserAddressSuccess(signInAddressData))
  } catch (e) {
    yield put(signFailure(['Erro na requisição de endereço do usuário']))
    yield delay(delayToCleanErrors, true)
    yield put(signFailure(null))
  }
}

function* signUpUser({ data }: { data: SignUpFormData }) {
  let errors
  yield api
    .post('/user', data)
    .then((response: AxiosResponse) => {
      console.log('resposta', response)
    })
    .catch((reason: AxiosError) => {
      errors = reason.response?.data.errors
    })
  if (Array.isArray(errors)) {
    yield put(signFailure(errors))
    yield delay(delayToCleanErrors, true)
    yield put(signFailure(null))
  } else {
    const { email, password } = data
    const signInData = {
      email,
      password,
    }
    yield put(signInRequest(signInData))
  }
}

function setToken({ payload }: { payload: RootState }) {
  if (!payload) {
    return
  }
  if (payload.auth.token) {
    api.defaults.headers.Authorization = payload.auth.token
  }
}
const takeLatest: any = Eff.takeLatest
export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signInUser),
  takeLatest('@auth/SIGN_UP_REQUEST', signUpUser),
  takeLatest('persist/REHYDRATE', setToken),
])
