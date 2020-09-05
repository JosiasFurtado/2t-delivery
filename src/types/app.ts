export interface IUser {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  imageUrl: string | null
  type: 'BUYER'
  cpf: string | null
  bornDate: string | null
}

export interface Product {
  id: string
  name: string
  img: string
  price: number
  description: string
}

export interface ProductInCart extends Product {
  amount: number
  priceFormatted: string
  commit: string
}

export interface ProductWithSubtotal extends ProductInCart {
  subtotal: string
}

export type AdvertisingCarouselItemType = {
  id: string
  image_url?: string
  description?: string
}

export type TutorialCarouselItemType = {
  id: string
  image: Element
  title: string
  description: string
}

export type ItemMock = {
  id: string
}

export type LoginModals = 'signin' | 'signup' | 'forgotMyPassword'

export type ProfileModals = 'address' | 'help' | 'config'

export type CartModals = 'comment' | 'cleanCart'

export interface SignInFormData {
  email: string
  password: string
}

export interface SignUpFormData {
  email: string
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
}

export interface AuthState {
  signed: boolean
  token: string | null
  error: string[] | null
  loading: boolean
}
