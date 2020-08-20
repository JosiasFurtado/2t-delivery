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
export type LoginModals = 'signin' | 'signup' | 'forgotMyPassword'
