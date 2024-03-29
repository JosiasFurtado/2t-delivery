export interface IUser {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  imageUrl: string | null
  type: 'BUYER'
  cpf: string | null
  boarnDate: string | null
}

export interface ProductInCart extends Product {
  amount: number
  priceFormatted: string
  commit: string
  marketId: number
}

export interface ProductWithSubtotal extends ProductInCart {
  subtotal: string
}

export type AdvertisingCarouselItemType = {
  id: string
  image: any
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

export type ProfileModals = 'address' | 'help' | 'config' | 'newAddress'

export type CartModals = 'comment' | 'cleanCart'

export type CheckoutModals = 'address' | 'newAddress' | 'payments'

export interface CheckoutFormData {
  phone: string
  cpf: string
}

export interface SignInFormData {
  email: string
  password: string
}

export interface ForgotPasswordFormData {
  email: string
}

export interface AddressFormData {
  zipcode: string
  name: string
  number: number
  aditionalInfo: string
}

export interface CheckoutFormDataToSubmit {
  isTakeOut: boolean
  marketId: number
  items: {
    productId: number
    amount: number
  }[]
  paymentMethodId: number
  addressId: number
  windowId: number
  contact: string
}

export interface FullAddressData {
  zipcode: string
  name: string
  number: number
  aditionalInfo: string
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

export interface UserState {
  user: IUser | null
  activeAddressId: number | null
  addresses: UserAddress[] | null
  loading: boolean
}

export interface CartState {
  products: ProductInCart[]
}

export interface UpdateUserFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  cpf: string
  bornDate: string
}

export interface UserAddress {
  id: number
  userId: number
  name: string
  number: number
  aditionalInfo: string
  zipcode: string
  street: string
  city: string
  state: string
  neighborhood: string
}

export interface Market {
  id: number
  imageUrl: string | null
  name: string
  color: string | null
  bio: string | null
  policy: string | null
  minimalPrice: string
  email: string
  address: Address
  schedule: Schedule
  slogan: string | null
  range: number
  delivery: boolean
  createdAt: string
  updatedAt: string
  tags: Tag[] | []
  phones: Phone[]
  windows: Window[]
  deliveryRanges: DeliveryRange[] | []
  distanceBetweenUser: number
}

export interface Phone {
  id: number
  type: string
  number: string
  createdAt: string
  updatedAt: string
  marketId: number
}

export interface Schedule {
  sunday: Horary
  monday: Horary
  tuesday: Horary
  wednesday: Horary
  thursday: Horary
  friday: Horary
  saturday: Horary
}

export interface Horary {
  startsAt: string
  endsAt: string
}

export interface Address {
  city: string
  zipcode: string
  neighborhood: string
  aditionalInfo: string
  number: string
  state: string
  street: string
}

export interface DeliveryRange {
  id: number
  price: string
  startsAt: number
  endsAt: number
  createdAt: string
  updatedAt: string
  marketId: number
}

export type Weekday =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'

export interface Window {
  id: number
  weekDay: Weekday
  startsAt: string
  endsAt: string
  createdAt: string
  updatedAt: string
  marketId: number
}

export interface Tag {
  id: number
  createdAt: string
  updatedAt: string
  marketId: number
  tagId: number
  tag: Tag2
}

export interface Tag2 {
  id: number
  content: string
  createdAt: string
  updatedAt: string
}

export interface MarketWithCategories extends Market {
  categories: Category[]
}

export interface Category {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  marketId: number
  iconId: number
  categories: Subcategory[]
}

export interface Subcategory {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  categoryId: number
  products: Product[]
}

export interface Product {
  id: number
  name: string
  imageUrl: string
  description: string | null
  nutritionalTable: NutritionalTable
  weight: number | null
  volume: number | null
  price: string
  promotionPrice: string | null
  isPromoted: boolean
  amount: number | null
  adult: boolean
  createdAt: string
  updatedAt: string
  subcategoryId: number
  isExclusive: boolean
}

export interface NutritionalTable {}

export type Payments = Payment[]

export type PaymentTypes =
  | 'Vale Refeição'
  | 'Cartões de Débito'
  | 'Principais'
  | 'Vale Alimentação'
  | 'Cartões de Crédito'

export interface Payment {
  id: number
  name: PaymentTypes
  createdAt: string
  updatedAt: string
  marketId: number
  methods: Method[]
}

export interface Method {
  id: number
  delivery: boolean
  online: boolean
  name: string
  createdAt: string
  updatedAt: string
  paymentTypeId: number
}

export interface PaymentSelected {
  id: number
  payment: PaymentTypes
  method: string
}

export type OrderStatus =
  | 'SENT'
  | 'SEEN'
  | 'DOING'
  | 'READY'
  | 'FINISHED'
  | 'CANCELED'

export interface Order {
  id: number
  status: OrderStatus
  total: string
  isTakeOut: boolean
  seenAt: string | null
  readyAt: string | null
  finishedAt: string | null
  canceledAt: string | null
  createdAt: string
  window: Window | null
  market: {
    id: number
    name: string
    imageUrl: string
    email: string
    address: Address
    phones: Phone[]
  }
  user: IUser
  address: Address
  items: OrderItem[]
  paymentMethod: {
    id: number
    name: string
  }
}

export interface OrderItem {
  amount: number
  comment: string
  price: string
  orderId: number
  id: number
  product: Product
}
