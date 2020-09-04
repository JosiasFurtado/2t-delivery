import { Reducer, Action } from 'redux'
import produce from 'immer'
import { ProductInCart } from 'types/app'

interface ICartAction extends Action {
  id?: number
  amount: number
  product: ProductInCart
}

const Cart: Reducer<any, ICartAction> = (
  state: ProductInCart[] = [],
  action: ICartAction,
) => {
  switch (action.type) {
    case '@cart/ADD_SUCCESS':
      return produce(state, draft => {
        const { product } = action

        draft.push(product)
      })
    case '@cart/UPDATE_AMOUNT_SUCCESS': {
      return produce(state, (draft: any[]) => {
        const productIndex = draft.findIndex(
          product => product.id === action.id,
        )

        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount)
        }
      })
    }
    case '@cart/REMOVE':
      return produce(state, (draft: any[]) => {
        const productIndex = draft.findIndex(
          product => product.id === action.id,
        )

        if (productIndex >= 0) {
          draft.splice(productIndex, 1)
        }
      })
    case '@cart/REMOVE_ALL':
      return produce(state, (draft: any[]) => {
        draft.splice(0, state.length)
      })

    default:
      return state
  }
}

export default Cart
