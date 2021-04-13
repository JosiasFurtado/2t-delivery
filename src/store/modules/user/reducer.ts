import { Reducer, Action } from 'redux'
import produce from 'immer'
import { IUser, UserAddress, UserState } from 'types/app'

interface IUserAction extends Action {
  user: IUser
  addresses: UserAddress[]
  token: string
  error: string[] | null
  loading: boolean
  addressId: number
}

const INITIAL_STATE = {
  user: null,
  activeAddressId: null,
  addresses: null,
  loading: false
}

const Auth: Reducer<
  UserState,
  IUserAction
> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.user = action.user
        break
      }
      case '@user/ADD_USER_ADDRESS_REQUEST': {
        draft.loading = true
        break
      }
      case '@user/GET_USER_ADDRESS_SUCCESS': {
        draft.loading = false
        draft.addresses = action.addresses
        draft.activeAddressId = draft.activeAddressId ? draft.activeAddressId : action.addresses[0].id
        break
      }
      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.user = action.user
        break
      }
      case '@user/UPDATE_USER_ADDRESS_ACTIVE': {
        draft.activeAddressId = action.addressId
        break
      }
      case '@auth/SIGN_OUT': {
        draft.user = null
        draft.activeAddressId = null
        break
      }
      default:
    }
  })
}

export default Auth
