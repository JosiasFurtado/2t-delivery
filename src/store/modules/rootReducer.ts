import { combineReducers } from 'redux'
import cart from './cart/reducer'
import user from './user/reducer'
import auth from './auth/reducer'
import { ProductInCart, AuthState, IUser } from 'types/app'

export interface RootState {
  readonly cart: ProductInCart[]
  readonly auth: AuthState
  readonly user: { user: IUser | null }
}
const reducers = {
  cart,
  user,
  auth,
}
export default combineReducers<RootState>(reducers)
