import React, {
  useRef,
  Dispatch,
  SetStateAction,
  useState,
  useCallback,
} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { SubmitHandler, FormHandles } from '@unform/core'
import { LoginModals } from 'types/app'
import { tailwind } from 'lib/styles'
import ForgotMyPasswordForm from 'components/Form/ForgotMyPasswordForm'
import PrimaryButton from 'components/styledComponents/PrimaryButton'
import LayoutModal from '../LayoutModal'

interface ForgotMyPasswordProps {
  readonly open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  setTypeModal: Dispatch<SetStateAction<LoginModals>>
}

const ForgotMyPassword: React.FC<ForgotMyPasswordProps> = ({
  open,
  setOpenModal,
  setTypeModal,
}) => {
  const formRef = useRef<FormHandles>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmitForgotMyPassword: SubmitHandler<FormData> = useCallback(
    (data, { reset }) => {
      console.warn(data)

      reset()
    },
    [],
  )
  const handleChangeToSignIn = () => {
    setOpenModal(false)
    setTypeModal('signin')
    setOpenModal(true)
  }

  const handleSubmitAndShowMessage = () => {
    setMessage(
      'Se o email existir no nosso banco de dados, você receberá as instruções no seu email.',
    )
    formRef.current?.submitForm()
  }

  return (
    <LayoutModal
      title="Esqueci minha senha"
      open={open}
      setOpenModal={setOpenModal}
    >
      <View style={tailwind('rounded-t-lg bg-white px-5 pt-3 pb-12')}>
        <Text style={tailwind('text-primary-500 text-2xl font-medium pt-4')}>
          Esqueceu a sua senha?
        </Text>
        <Text style={tailwind('text-gray-500 text-lg mb-16')}>
          Digite seu email para recuperar
        </Text>
        {message && (
          <Text style={tailwind('text-red-400 text-lg mb-2')}>{message}</Text>
        )}
        <ForgotMyPasswordForm
          formRef={formRef}
          handleSubmit={handleSubmitForgotMyPassword}
          style={tailwind('mb-4')}
        />
        <PrimaryButton
          onPress={handleSubmitAndShowMessage}
          style={tailwind('mb-20')}
        >
          <Text style={tailwind('text-xl text-white')}>Enviar</Text>
        </PrimaryButton>
        <View style={tailwind('mb-2 flex flex-row justify-center')}>
          <Text style={tailwind('text-lg')}>Lembrou sua senha?</Text>
          <TouchableOpacity onPress={handleChangeToSignIn}>
            <Text style={tailwind('ml-3 text-primary-500 text-lg')}>
              Entrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LayoutModal>
  )
}

ForgotMyPassword.displayName = 'ForgotMyPassword'

export default ForgotMyPassword
