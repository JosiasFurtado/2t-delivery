import React, { SetStateAction, Dispatch } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import ForgotMyPassword from './ForgotMyPassword'
import { LoginModals } from 'types/app'

interface LoginModalProps {
  readonly type: LoginModals
  readonly open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  setTypeModal: Dispatch<SetStateAction<LoginModals>>
}

const LoginModal: React.FC<LoginModalProps> = ({
  type,
  open,
  setOpenModal,
  setTypeModal,
}) => {
  if (type === 'signin') {
    return (
      <SignIn
        open={open}
        setOpenModal={setOpenModal}
        setTypeModal={setTypeModal}
      />
    )
  }
  if (type === 'signup') {
    return (
      <SignUp
        open={open}
        setOpenModal={setOpenModal}
        setTypeModal={setTypeModal}
      />
    )
  }
  return (
    <ForgotMyPassword
      open={open}
      setOpenModal={setOpenModal}
      setTypeModal={setTypeModal}
    />
  )
}

LoginModal.displayName = 'LoginModal'

export default LoginModal
