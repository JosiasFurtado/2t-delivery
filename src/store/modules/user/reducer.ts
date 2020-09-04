import { Reducer, Action } from 'redux'
import produce from 'immer'

interface IUserAction extends Action {}

const User: Reducer<any, IUserAction> = (state = {}, action) => {
  switch (action.type) {
    case '@user/SIGNIN_SUCCESS':
      return produce(state, draft => {
        // const { product } = action
        // draft.push(product)
      })
    default:
      return state
  }
}

export default User
