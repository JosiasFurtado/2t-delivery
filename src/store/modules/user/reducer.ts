import { Reducer, Action } from 'redux'
import produce from 'immer'
import { IUser } from 'types/app'

interface IUserAction extends Action {
  user: IUser
  token: string
  error: string[] | null
  loading: boolean
}

const INITIAL_STATE = {
  user: null,
}

const Auth: Reducer<{ user: IUser | null }, IUserAction> = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case '@auth/SIGN_IN_SUCCESS':
      return produce(state, draft => {
        draft.user = action.user
      })
    default:
      return state
  }
}

export default Auth
