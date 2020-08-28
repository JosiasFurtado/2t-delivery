export interface API {}

export type AdvertisingCarouselItemType = {
  id: number
  image_url?: string
  description?: string
}

export type TutorialCarouselItemType = {
  id: number
  image: Element
  title: string
  description: string
}

export type ItemMock = {
  id: number
}

export type LoginModals = 'signin' | 'signup' | 'forgotMyPassword'

export type ProfileModals = 'address' | 'help' | 'config'
