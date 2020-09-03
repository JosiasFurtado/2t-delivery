import { Reducer, Action } from 'redux'
import produce from 'immer'
import { ProductInCart, Product } from 'types/app'

interface ICartAction extends Action {
  id?: number
  amount: number
  product: ProductInCart
}

const Cart: Reducer<any, ICartAction> = (
  state: Product[] = [],
  action: ICartAction,
) => {
  switch (action.type) {
    case '@cart/ADD_SUCCESS':
      return produce(state, (draft: any[]) => {
        const { product } = action

        draft.push(product)
      })
    case '@cart/REMOVE':
      return produce(state, (draft: any[]) => {
        const productIndex = draft.findIndex(
          product => product.id === action.id,
        )

        if (productIndex >= 0) {
          draft.splice(productIndex, 1)
        }
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

    default:
      return state
  }
}

export default Cart
