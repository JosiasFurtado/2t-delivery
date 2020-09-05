import React, {
  Dispatch,
  SetStateAction,
  useRef,
  useCallback,
  useState,
} from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { tailwind } from 'lib/styles'
import { LoginModals, SignInFormData } from 'types/app'
import PrimaryButton from 'components/styledComponents/PrimaryButton'
import SignInForm from 'components/Form/SignInForm'
import { FormHandles } from '@unform/core'
import { useNavigation } from '@react-navigation/native'
import LayoutModal from '../LayoutModal'
import * as Yup from 'yup'
import getValidationsErrors from 'utils/getValidationsErrors'
import api from 'services/api'
import { useDispatch, useSelector } from 'react-redux'
import { signInRequest } from 'store/modules/auth/actions'
import { RootState } from 'store/modules/rootReducer'

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
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state: RootState) => state.auth)
  const formRef = useRef<FormHandles>(null)
  const { navigate } = useNavigation()
  const [loginError, setLoginError] = useState<string | null>()

  const handleSubmitSignIn = useCallback(
    async (data: SignInFormData, { reset }) => {
      try {
        setLoginError(null)
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string()
            .required('Senha obrigatória')
            .min(8, 'No mínimo 8 digitos na senha'),
        })
        await schema.validate(data, {
          abortEarly: false,
        })
        dispatch(signInRequest(data))
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(error)

          formRef.current?.setErrors(errors)
          return
        } else {
          setLoginError('E-mail e/ou senha inválidos')
        }
      }
      // reset()
    },
    [],
  )

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
          {error?.map((item, index) => (
            <Text key={index} style={tailwind('mb-1 text-base text-red-500')}>
              {item}
            </Text>
          ))}
          {loginError && (
            <Text style={tailwind('text-red-400 text-lg mb-2')}>
              {loginError}
            </Text>
          )}
          <SignInForm
            formRef={formRef}
            handleSubmit={handleSubmitSignIn}
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
            onPress={() => {
              setOpenModal(false)
              navigate('Home')
            }}
            style={tailwind('mb-20')}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={tailwind('text-xl text-white')}>Entrar</Text>
            )}
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
