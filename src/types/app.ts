export interface API {}

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
