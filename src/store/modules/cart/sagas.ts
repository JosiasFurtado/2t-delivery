import { select, put, all, delay } from 'redux-saga/effects'
import * as Eff from 'redux-saga/effects'

import { addToCartSuccess, updateAmountFailure, updateAmountSuccess } from './actions'
import { MarketWithCategories, Product, ProductInCart } from 'types/app'
import formatPrice from 'utils/formatPrice'
import { RootState } from '../rootReducer'

const delayToCleanErrors = 4000

function* addToCart({
  product,
  market,
  amount,
  commit,
}: {
  product: Product
  market: MarketWithCategories
  amount: number
  commit: string
}) {
  const cart = yield select((state: RootState) => state.cart)
  const productExists: ProductInCart = cart.find(
    (productInCart: ProductInCart) => productInCart.id === product.id,
  )

  if(cart[0] && cart[0].marketId !== market.id) {
    yield put(updateAmountFailure(['Só produtos do mesmo mercado podem ser adicionados no carrinho']))
    yield delay(delayToCleanErrors, true)
    yield put(updateAmountFailure(null))
    return
  }
  const currentAmount = productExists ? productExists.amount : 0
  const amountIncrement = amount ? currentAmount + amount : currentAmount + 1

  if (productExists) {
    yield put(updateAmountSuccess(product.id, amountIncrement))
  } else {
    const priceFormatted = formatPrice(product.price)
    const data = {
      ...product,
      amount: amount || 1,
      priceFormatted,
      commit: commit || '',
      marketId: market.id,
    }

    yield put(addToCartSuccess(data))
  }
}

function* updateAmount({ id, amount }: { id: number; amount: number }) {
  if (amount <= 0) return

  yield put(updateAmountSuccess(id, amount))
}

const { takeLatest } = Eff
export default all([
  takeLatest<any>('@cart/ADD_REQUEST', addToCart),
  takeLatest<any>('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
])
