import React, { SetStateAction, Dispatch } from 'react'
import Address from './Address'
import Help from './Help'
import { ProfileModals } from 'types/app'

interface ProfileModalProps {
  readonly type: ProfileModals
  readonly open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  type,
  open,
  setOpenModal,
}) => {
  if (type === 'address') {
    return <Address open={open} setOpenModal={setOpenModal} />
  }
  return <Help open={open} setOpenModal={setOpenModal} />
}

ProfileModal.displayName = 'ProfileModal'

export default ProfileModal
