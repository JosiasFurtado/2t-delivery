import { Reducer, Action } from 'redux'
import produce from 'immer'
import { IUser, UserAddress } from 'types/app'

interface IUserAction extends Action {
  user: IUser
  address: UserAddress[]
  token: string
  error: string[] | null
  loading: boolean
}

const INITIAL_STATE = {
  user: null,
  address: null,
}

const Auth: Reducer<
  { user: IUser | null; address: UserAddress[] | null },
  IUserAction
> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.user = action.user
        break
      }
      case '@user/GET_USER_ADDRESS_SUCCESS': {
        draft.address = action.address
        break
      }
      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.user = action.user
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
