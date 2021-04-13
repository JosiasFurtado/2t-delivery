import { Reducer, Action } from 'redux'
import produce from 'immer'
import { ProductInCart } from 'types/app'

interface ICartAction extends Action {
  id?: number
  amount: number
  product: ProductInCart
  error: string[] | null
  comment: string
}

const Cart: Reducer<any, ICartAction> = (
  state: ProductInCart[] = [],
  action: ICartAction,
) => {
  return produce(state, draft => {
  switch (action.type) {
    case '@cart/ADD_SUCCESS': {
        draft.push(action.product)
        break
    }
    case '@cart/UPDATE_AMOUNT_SUCCESS': {
        const productIndex = draft.findIndex(
          (product: ProductInCart) => product.id === action.id,
        )
        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount)
        }
        break
      }
    case '@cart/UPDATE_PRODUCT_COMMENT': {
        const productIndex = draft.findIndex(
          (product: ProductInCart) => product.id === action.id,
        )
          draft[productIndex].commit = action.comment
        break
      }
    case '@cart/REMOVE': {
        const productIndex = draft.findIndex(
          (product: ProductInCart) => product.id === action.id,
        )
        if (productIndex >= 0) {
          draft.splice(productIndex, 1)
        }
        break 
      }
    case '@cart/REMOVE_ALL': {
        draft.splice(0, state.length)
        break
    }
    case '@auth/SIGN_OUT': {
        draft.splice(0, state.length)
        break
    }
    default:
    }
  })
}

export default Cart
