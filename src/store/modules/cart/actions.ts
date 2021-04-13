import { Market, MarketWithCategories, Product, ProductInCart } from 'types/app'

export function addToCartRequest(
  product: Product,
  market: Market | MarketWithCategories,
  amount?: number,
  commit?: string | undefined
) {
  return {
    type: '@cart/ADD_REQUEST',
    product,
    market,
    amount,
    commit,
  }
}

export function addToCartSuccess(product: ProductInCart) {
  return {
    type: '@cart/ADD_SUCCESS',
    product,
  }
}

export function removeFromCart(id: number) {
  return {
    type: '@cart/REMOVE',
    id,
  }
}
export function removeAllFromCart() {
  return {
    type: '@cart/REMOVE_ALL',
  }
}

export function updateProductComment(comment: string, id: number) {
  return {
    type: '@cart/UPDATE_PRODUCT_COMMENT',
    comment,
    id
  }
}

export function updateAmountRequest(id: number, amount: number) {
  return {
    type: '@cart/UPDATE_AMOUNT_REQUEST',
    id,
    amount,
  }
}

export function updateAmountSuccess(id: number, amount: number) {
  return {
    type: '@cart/UPDATE_AMOUNT_SUCCESS',
    id,
    amount,
  }
}

export function updateAmountFailure(error: string[] | null) {
  return {
    type: '@cart/UPDATE_AMOUNT_FAILURE',
    error,
  }
}
