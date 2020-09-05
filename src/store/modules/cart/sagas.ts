import { select, put, all } from 'redux-saga/effects'
import * as Eff from 'redux-saga/effects'

import { addToCartSuccess, updateAmountSuccess } from './actions'
import { Product, ProductInCart } from 'types/app'
import formatPrice from 'utils/formatPrice'

function* addToCart({
  product,
  amount,
  commit,
}: {
  product: Product
  amount: number
  commit: string
}) {
  const productExists = yield select(state =>
    state.cart.find(
      (productInCart: ProductInCart) => productInCart.id === product.id,
    ),
  )

  const currentAmount = productExists ? productExists.amount : 0
  const amountReal = currentAmount + 1

  if (productExists) {
    yield put(updateAmountSuccess(product.id, amountReal))
  } else {
    const priceFormatted = formatPrice(product.price)
    const data = {
      ...product,
      amount: amount || 1,
      priceFormatted,
      commit: commit || '',
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
