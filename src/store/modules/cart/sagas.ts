import { select, put, all } from 'redux-saga/effects'
import * as Eff from 'redux-saga/effects'

import { addToCartSuccess, updateAmountSuccess } from './actions'
import { Product, ProductInCart } from 'types/app'

function* addToCart({ product }: { product: Product }) {
  const productExists = yield select(state =>
    state.cart.find(
      (productInCart: ProductInCart) => productInCart.id === product.id,
    ),
  )

  const currentAmount = productExists ? productExists.amount : 0
  const amount = currentAmount + 1

  if (productExists) {
    yield put(updateAmountSuccess(product.id, amount))
  } else {
    const priceFormatted = String(product.price).replace('.', ',')
    const data = {
      ...product,
      amount: 1,
      priceFormatted,
      commit: '',
    }

    yield put(addToCartSuccess(data))
  }
}

function* updateAmount({ id, amount }: { id: string; amount: number }) {
  if (amount <= 0) return

  yield put(updateAmountSuccess(id, amount))
}

const takeLatest: any = Eff.takeLatest
export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
])
