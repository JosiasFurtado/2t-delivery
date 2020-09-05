import { Reducer, Action } from 'redux'
import produce from 'immer'
import { IUser, AuthState } from 'types/app'
import AsyncStorage from '@react-native-community/async-storage'

interface IUserAction extends Action {
  user: IUser
  token: string
  error: string[] | null
  loading: boolean
}

const INITIAL_STATE = {
  token: null,
  error: null,
  loading: false,
  signed: false,
}

const Auth: Reducer<AuthState, IUserAction> = (
  state = INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true
        break
      }
      case '@auth/SIGN_IN_SUCCESS': {
        const { token } = action
        draft.loading = false
        draft.signed = true
        draft.token = token
        break
      }
      case '@auth/SIGN_FAILURE': {
        const { error } = action
        console.warn('error no reducer', error)
        draft.error = error
        draft.loading = false
        break
      }
      case '@auth/SIGN_OUT': {
        draft.token = null
        draft.signed = false
        break
      }
      default:
    }
  })
}

export default Auth