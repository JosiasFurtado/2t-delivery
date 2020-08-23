import React, { useRef, Dispatch, SetStateAction } from 'react'
import { View, Text, Modal, StatusBar, TouchableOpacity } from 'react-native'
import { SubmitHandler, FormHandles } from '@unform/core'
import { LoginModals } from 'types/app'
import { tailwind, getColor } from 'lib/styles'
import { Ionicons } from '@expo/vector-icons'
import ForgotMyPasswordForm from 'components/Form/ForgotMyPasswordForm'
import PrimaryButton from 'components/styledComponents/PrimaryButton'
import { BgModal } from '.'

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

  const handleSubmit: SubmitHandler<FormData> = (data, { reset }) => {
    console.warn(data)

    reset()
  }
  const handleChangeToSignIn = () => {
    setOpenModal(false)
    setTypeModal('signin')
    setOpenModal(true)
  }

  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent
      onRequestClose={() => setOpenModal(false)}
    >
      <StatusBar
        backgroundColor={getColor('primary-700')}
        barStyle="light-content"
      />
      <BgModal>
        <TouchableOpacity
          onPress={() => setOpenModal(!open)}
          style={tailwind('px-5 mb-4')}
        >
          <Ionicons name="md-arrow-back" size={35} color="#fff" />
        </TouchableOpacity>
        <Text style={tailwind('px-5 mb-4 text-3xl text-white')}>Entrar</Text>
        <View style={tailwind('rounded-t-lg bg-white px-5 py-3')}>
          <Text style={tailwind('text-primary-500 text-2xl font-medium pt-4')}>
            Esqueceu a sua senha?
          </Text>
          <Text style={tailwind('text-gray-500 text-lg mb-16')}>
            Digite seu email para recuperar
          </Text>
          <ForgotMyPasswordForm
            formRef={formRef}
            handleSubmit={handleSubmit}
            style={tailwind('mb-4')}
          />
          <PrimaryButton
            onPress={() => formRef.current?.submitForm()}
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
      </BgModal>
    </Modal>
  )
}

ForgotMyPassword.displayName = 'ForgotMyPassword'

export default ForgotMyPassword
