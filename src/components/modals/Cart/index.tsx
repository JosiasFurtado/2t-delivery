import React, { SetStateAction, Dispatch } from 'react'
import ItemComment from './ItemComment'
import CleanCart from './CleanCart'
import { CartModals } from 'types/app'

interface CartModalProps {
  readonly type: CartModals
  readonly open: boolean
  readonly comment: string | undefined
  setComment: Dispatch<SetStateAction<string | undefined>>
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const CartModal: React.FC<CartModalProps> = ({
  type,
  open,
  setOpenModal,
  setComment,
  comment,
}) => {
  if (type === 'comment') {
    return (
      <ItemComment
        comment={comment}
        setComment={setComment}
        open={open}
        setOpenModal={setOpenModal}
      />
    )
  }
  return <CleanCart open={open} setOpenModal={setOpenModal} />
}

CartModal.displayName = 'CartModal'

export default CartModal
