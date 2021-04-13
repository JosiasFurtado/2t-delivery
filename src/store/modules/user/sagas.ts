import { select, put, all, call, delay } from 'redux-saga/effects'
import * as Eff from 'redux-saga/effects'
import api from 'services/api'
import { RootState } from '../rootReducer'
import { FullAddressData, UpdateUserFormData, UserAddress } from 'types/app'
import { AxiosError, AxiosResponse } from 'axios'
import { updateUserAddressActive } from './actions'
import { getUserAddressSuccess } from '../auth/actions'
import { setAndCleanErros } from '../auth/sagas'

function* updateViewer({ data }: { data: UpdateUserFormData }) {
  // const { user } = yield select((state: RootState) => state.user)
  // const response = yield api.patch(`/user/${user.id}`, data)
}

function* updateAddresses(userId: number) {
  try {
    let addressesData: any
    yield api
      .get(`/user/${userId}/address`)
      .then((response: AxiosResponse) => {
        addressesData = response.data.addresses
      })
      .catch((reason: AxiosError) => {
        setAndCleanErros(reason.response?.data.errors)
      })
    yield put(getUserAddressSuccess(addressesData))
  } catch (e) {
    yield setAndCleanErros(['Erro na atualização de endereços do usuário'])
  }
}

function* dispatchUpdateAddresses({ id }: { id: number }) {
  yield updateAddresses(id)
}

function* addUserAddress({ data }: { data: FullAddressData }) {
  const { user } = yield select((state: RootState) => state.user)
  try {
    let responsePostZipCode: any

    yield api
      .post(`/user/${user.id}/address`, data)
      .then((response: AxiosResponse) => {
        responsePostZipCode = response.data
      })
      .catch((reason: AxiosError) => {
        setAndCleanErros(reason.response?.data.errors)
      })

    const { address }: { address: UserAddress } = responsePostZipCode

    yield updateAddresses(user.id)
    yield put(updateUserAddressActive(address.id))
  } catch (e) {
    yield setAndCleanErros(['Falha ao cadastrar um endereço, tente novamente.'])
  }
}

const { takeLatest } = Eff
export default all([
  takeLatest<any>('@user/UPDATE_USER_REQUEST', updateViewer),
  takeLatest<any>('@user/UPDATE_ADDRESSES', dispatchUpdateAddresses),
  takeLatest<any>('@user/ADD_USER_ADDRESS_REQUEST', addUserAddress)
])
