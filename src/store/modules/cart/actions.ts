import { Product, ProductInCart } from 'types/app'

export function addToCartRequest(product: Product) {
  return {
    type: '@cart/ADD_REQUEST',
    product,
  }
}

export function addToCartSuccess(product: ProductInCart) {
  return {
    type: '@cart/ADD_SUCCESS',
    product,
  }
}

export function removeFromCart(id: string) {
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

export function updateAmountRequest(id: string, amount: number) {
  return {
    type: '@cart/UPDATE_AMOUNT_REQUEST',
    id,
    amount,
  }
}

export function updateAmountSuccess(id: string, amount: number) {
  return {
    type: '@cart/UPDATE_AMOUNT_SUCCESS',
    id,
    amount,
  }
}
