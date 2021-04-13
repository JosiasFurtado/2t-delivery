import { combineReducers } from 'redux'
import cart from './cart/reducer'
import user from './user/reducer'
import auth from './auth/reducer'
import { AuthState, UserState, ProductInCart } from 'types/app'

export interface RootState {
  readonly cart: ProductInCart[]
  readonly auth: AuthState
  readonly user: UserState
}
const reducers = {
  cart,
  user,
  auth,
}
export default combineReducers<RootState>(reducers)
