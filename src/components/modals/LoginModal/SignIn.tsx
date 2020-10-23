import React, {
  Dispatch,
  SetStateAction,
  useRef,
  useCallback,
  useState,
  useEffect,
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
import { useDispatch, useSelector } from 'react-redux'
import { signInRequest } from 'store/modules/auth/actions'
import { RootState } from 'store/modules/rootReducer'
import { signInSchema } from 'utils/schemas'

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
  const { user } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const { loading } = useSelector((state: RootState) => state.auth)
  const formRef = useRef<FormHandles>(null)
  const { navigate } = useNavigation()
  const [loginError, setLoginError] = useState<string | null>()

  useEffect(() => {
    if (user) {
      setOpenModal(false)
      navigate('Home')
    }
  }, [user])

  const handleSubmitSignIn = useCallback(
    async (data: SignInFormData, { reset }) => {
      try {
        setLoginError(null)
        formRef.current?.setErrors({})
        await signInSchema.validate(data, {
          abortEarly: false,
        })
        dispatch(signInRequest(data))
        // Se o usuario já tiver endereço cadastrado navegar para home, se não,
        // tela de add endereço inicial
        // if(user) {
        //   return navigate('Home')
        // }
        // navigate('InitialAddress')
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(error)

          formRef.current?.setErrors(errors)
          return
        }
        return setLoginError('E-mail e/ou senha inválidos')
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
      <View style={tailwind('rounded-t-lg bg-white px-5 pt-3 pb-12')}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={tailwind('text-primary-500 text-2xl font-medium pt-4')}>
            Bem-vindo novamente
          </Text>
          <Text style={tailwind('text-gray-500 text-lg mb-16')}>
            Faça o log-in para continuar
          </Text>
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
            onPress={() => formRef.current?.submitForm()}
            style={tailwind('mb-20')}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size={28} />
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
