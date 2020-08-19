import React, { Dispatch, SetStateAction, useRef } from 'react'
import { View, TouchableOpacity, Text, StatusBar, Modal } from 'react-native'
import styled from 'styled-components/native'
import { tailwind } from 'lib/styles'
import { Ionicons } from '@expo/vector-icons'
import { LoginModals } from 'types/app'
import PrimaryButton from 'components/styledComponents/PrimaryButton'
import SignInForm from 'components/Form/SignInForm'
import { SubmitHandler, FormHandles } from '@unform/core'
import { useNavigation } from '@react-navigation/native'

interface SignInProps {
  readonly open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  setTypeModal: Dispatch<SetStateAction<LoginModals>>
}

const BgModal = styled.View`
  background-color: rgba(0, 0, 0, 0.2);
  flex: 1;
  justify-content: flex-end;
`

const SignIn: React.FC<SignInProps> = ({
  open,
  setOpenModal,
  setTypeModal,
}) => {
  const formRef = useRef<FormHandles>(null)
  const { navigate } = useNavigation()

  const handleSubmit: SubmitHandler<FormData> = (data, { reset }) => {
    console.warn(data)

    reset()
  }
  const handleChangeToSignUp = () => {
    setOpenModal(false)
    setTypeModal('signup')
    setOpenModal(true)
  }

  const handleChangeToForgotMyPassword = () => {
    setOpenModal(false)
    setTypeModal('forgotMyPassword')
    setOpenModal(true)
  }

  const handleSubmitFormAndRedirectToHome = () => {
    try {
      formRef.current?.submitForm()
    } catch (error) {
      console.warn(error)
    }
    setOpenModal(false)
    navigate('Home')
  }

  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent
      onRequestClose={() => setOpenModal(false)}
    >
      <StatusBar backgroundColor="rgb(1, 124, 68)" barStyle="light-content" />
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
            Bem-vindo novamente
          </Text>
          <Text style={tailwind('text-gray-500 text-lg mb-16')}>
            Faça o log-in para continuar
          </Text>
          <SignInForm
            formRef={formRef}
            handleSubmit={handleSubmit}
            style={tailwind('mb-4')}
          />
          <TouchableOpacity
            onPress={handleChangeToForgotMyPassword}
            style={tailwind('mb-6')}
          >
            <Text style={tailwind('text-primary-500 text-lg')}>
              Esqueci minha senha
            </Text>
          </TouchableOpacity>
          <PrimaryButton
            onPress={handleSubmitFormAndRedirectToHome}
            style={tailwind('mb-20')}
          >
            <Text style={tailwind('text-xl text-white')}>Entrar</Text>
          </PrimaryButton>
          <View style={tailwind('mb-2 flex flex-row justify-center')}>
            <Text style={tailwind('text-lg')}>Não tem uma conta?</Text>
            <TouchableOpacity onPress={handleChangeToSignUp}>
              <Text style={tailwind('ml-3 text-primary-500 text-lg')}>
                Cadastre-se
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BgModal>
    </Modal>
  )
}

SignIn.displayName = 'SignIn'

export default SignIn
