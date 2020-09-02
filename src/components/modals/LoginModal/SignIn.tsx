import React, { Dispatch, SetStateAction, useRef, useCallback } from 'react'
import { View, TouchableOpacity, Text, ScrollView } from 'react-native'
import { tailwind } from 'lib/styles'
import { LoginModals, SignInFormData } from 'types/app'
import PrimaryButton from 'components/styledComponents/PrimaryButton'
import SignInForm from 'components/Form/SignInForm'
import { FormHandles } from '@unform/core'
import { useNavigation } from '@react-navigation/native'
import LayoutModal from '../LayoutModal'
import * as Yup from 'yup'
import getValidationsErrors from 'utils/getValidationsErrors'

interface SignInProps {
  readonly open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  setTypeModal: Dispatch<SetStateAction<LoginModals>>
}

const SignIn: React.FC<SignInProps> = ({
  open,
  setOpenModal,
  setTypeModal,
}) => {
  const formRef = useRef<FormHandles>(null)
  const { navigate } = useNavigation()

  const handleSubmit = useCallback(async (data: SignInFormData, { reset }) => {
    try {
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      })

      await schema.validate(data, {
        abortEarly: false,
      })
      // fazer login na api
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.warn('entrou no erro')
        const errors = getValidationsErrors(error)

        formRef.current?.setErrors(errors)
        return
      }
    }
    reset()
  }, [])

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
    <LayoutModal title="Entrar" open={open} setOpenModal={setOpenModal}>
      <View style={tailwind('rounded-t-lg bg-white px-5 py-3')}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
        </ScrollView>
      </View>
    </LayoutModal>
  )
}

SignIn.displayName = 'SignIn'

export default SignIn
