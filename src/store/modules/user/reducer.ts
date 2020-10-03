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
  addresses: null
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
      case '@user/GET_USER_ADDRESS_SUCCESS': {
        draft.addresses = action.addresses
        draft.activeAddressId = action.addresses[0].id
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
        break
      }
      default:
    }
  })
}

export default Auth
