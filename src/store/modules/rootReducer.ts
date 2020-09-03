import { combineReducers } from 'redux'
import cart from './cart/reducer'
import { ProductInCart } from 'types/app'

export interface RootState {
  readonly cart: ProductInCart[]
}
const reducers = {
  cart,
}
export default combineReducers<RootState>(reducers)
