/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { SetStateAction, Dispatch } from 'react'
import Address from '../Profile/Address'
import Payments from './Payments'

import { CheckoutModals, PaymentSelected } from 'types/app'
import NewAddress from '../Profile/NewAddress'

interface CheckoutModalProps {
    readonly type: CheckoutModals
    readonly open: boolean
    readonly checked: PaymentSelected | undefined
    setOpenModal: Dispatch<SetStateAction<boolean>>
    setTypeModal: Dispatch<SetStateAction<CheckoutModals>>
    setChecked: Dispatch<SetStateAction<PaymentSelected | undefined>>
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
    type,
    open,
    checked,
    setOpenModal,
    setTypeModal,
    setChecked
}) => {
    if (type === 'address') {
        // @ts-ignore
        return <Address open={open} setOpenModal={setOpenModal} setTypeModal={setTypeModal} />
    }
    if (type === 'newAddress') {
        // @ts-ignore
        return <NewAddress open={open} setOpenModal={setOpenModal} setTypeModal={setTypeModal} />
    }
    return <Payments open={open} checked={checked} setChecked={setChecked} setOpenModal={setOpenModal} setTypeModal={setTypeModal} />

}

CheckoutModal.displayName = 'CheckoutModal'

export default CheckoutModal
