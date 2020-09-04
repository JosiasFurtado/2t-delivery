import React, { SetStateAction, Dispatch } from 'react'
import ItemComment from './ItemComment'
import CleanCart from './CleanCart'
import { CartModals } from 'types/app'

interface CartModalProps {
  readonly type: CartModals
  readonly open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const CartModal: React.FC<CartModalProps> = ({ type, open, setOpenModal }) => {
  if (type === 'comment') {
    return <ItemComment open={open} setOpenModal={setOpenModal} />
  }
  return <CleanCart open={open} setOpenModal={setOpenModal} />
}

CartModal.displayName = 'CartModal'

export default CartModal
