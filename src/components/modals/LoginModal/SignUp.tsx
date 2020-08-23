import React, { Dispatch, SetStateAction, useRef } from 'react'
import { View, Text, TouchableOpacity, Modal, StatusBar } from 'react-native'
import { tailwind, getColor } from 'lib/styles'
import { Ionicons } from '@expo/vector-icons'
import { LoginModals } from 'types/app'
import PrimaryButton from 'components/styledComponents/PrimaryButton'
import SignUpForm from 'components/Form'
import { FormHandles, SubmitHandler } from '@unform/core'
import { BgModal } from '.'

interface SignUpProps {
  readonly open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  setTypeModal: Dispatch<SetStateAction<LoginModals>>
}

const SignUp: React.FC<SignUpProps> = ({
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
        <Text style={tailwind('px-5 mb-4 text-3xl text-white')}>Registrar</Text>
        <View style={tailwind('rounded-t-lg bg-white px-5 py-3')}>
          <Text style={tailwind('text-primary-500 text-2xl font-medium pt-4')}>
            Conte um pouco sobre você!
          </Text>
          <Text style={tailwind('text-gray-500 text-lg mb-8')}>
            Preencha os dados para continuar
          </Text>
          <SignUpForm
            formRef={formRef}
            handleSubmit={handleSubmit}
            style={tailwind('mb-2')}
          />
          <TouchableOpacity
            onPress={() => console.warn('click')}
            style={tailwind('mb-3')}
          >
            <Text style={tailwind('text-center')}>
              Ao realizar o cadastro você aceita os{' '}
              <Text style={tailwind('text-primary-500 ml-2 mr-2')}>
                termos de privacidade
              </Text>{' '}
              e o envio de promoções.
            </Text>
          </TouchableOpacity>
          <PrimaryButton
            onPress={() => formRef.current?.submitForm()}
            style={tailwind('mb-3')}
          >
            <Text style={tailwind('text-xl text-white')}>Registrar</Text>
          </PrimaryButton>
          <View style={tailwind('mb-2 flex flex-row justify-center')}>
            <Text style={tailwind('text-lg')}>Já tem uma conta?</Text>
            <TouchableOpacity onPress={handleChangeToSignIn}>
              <Text style={tailwind('ml-3 text-primary-500 text-lg')}>
                Entre!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BgModal>
    </Modal>
  )
}

SignUp.displayName = 'SignUp'

export default SignUp
