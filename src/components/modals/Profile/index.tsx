import React, { SetStateAction, Dispatch } from 'react'
import Address from './Address'
import NewAddress from './NewAddress'
import Config from './Config'
import Help from './Help'
import { ProfileModals } from 'types/app'

interface ProfileModalProps {
  readonly type: ProfileModals
  readonly open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  setTypeModal: Dispatch<SetStateAction<ProfileModals>>
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  type,
  open,
  setOpenModal,
  setTypeModal
}) => {
  if (type === 'address') {
    return <Address open={open} setOpenModal={setOpenModal} setTypeModal={setTypeModal} />
  }
  if (type === 'newAddress') {
    return <NewAddress open={open} setOpenModal={setOpenModal} setTypeModal={setTypeModal} />
  }
  if (type === 'config') {
    return <Config open={open} setOpenModal={setOpenModal} />
  }
  return <Help open={open} setOpenModal={setOpenModal} />
}

ProfileModal.displayName = 'ProfileModal'

export default ProfileModal
