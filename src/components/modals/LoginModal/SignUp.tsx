import React, {
  Dispatch,
  SetStateAction,
  useRef,
  useCallback,
  useState,
} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { tailwind } from 'lib/styles'
import { LoginModals, SignUpFormData } from 'types/app'
import PrimaryButton from 'components/styledComponents/PrimaryButton'
import SignUpForm from 'components/Form'
import { FormHandles } from '@unform/core'
import LayoutModal from '../LayoutModal'
import * as Yup from 'yup'
import getValidationsErrors from 'utils/getValidationsErrors'
import api from 'services/api'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/modules/rootReducer'
import { signUpRequest } from 'store/modules/auth/actions'

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
  const dispatch = useDispatch()
  const formRef = useRef<FormHandles>(null)
  const { loading, error } = useSelector((state: RootState) => state.auth)
  const [apiError, setApiError] = useState<string | null>()
  const { navigate, goBack } = useNavigation()

  const handleSubmitSignUp = useCallback(
    async (data: SignUpFormData, { reset }) => {
      try {
        setApiError(null)
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          firstName: Yup.string().required('Nome é obrigatório'),
          lastName: Yup.string().required('Nome é obrigatório'),
          password: Yup.string().min(8, 'No mínimo 8 dígitos'),
          confirmPassword: Yup.string().min(8, 'No mínimo 8 dígitos'),
        })
        await schema.validate(data, {
          abortEarly: false,
        })
        const dataToSubmit = { ...data, type: 'BUYER', gender: 'M' }
        dispatch(signUpRequest(dataToSubmit))
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(error)
          formRef.current?.setErrors(errors)
          return
        } else {
          if (data.password !== data.confirmPassword) {
            return setApiError('Senha e confirmação de senha estão diferentes')
          }
          setApiError('O e-mail já está em uso')
        }
      }
      // reset()
    },
    [],
  )
  const handleChangeToSignIn = () => {
    setOpenModal(false)
    setTypeModal('signin')
    setOpenModal(true)
  }

  return (
    <LayoutModal title="Registrar" open={open} setOpenModal={setOpenModal}>
      <View style={tailwind('rounded-t-lg bg-white px-5 py-3')}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={tailwind('text-primary-500 text-2xl font-medium pt-4')}>
            Conte um pouco sobre você!
          </Text>
          <Text style={tailwind('text-gray-500 text-lg mb-8')}>
            Preencha os dados para continuar
          </Text>
          {error?.map((item, index) => (
            <Text key={index} style={tailwind('mb-1 text-base text-red-500')}>
              {item}
            </Text>
          ))}
          {apiError ? (
            <Text style={tailwind('mb-1 text-base text-red-500')}>
              {apiError}
            </Text>
          ) : null}
          <SignUpForm
            formRef={formRef}
            handleSubmit={handleSubmitSignUp}
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
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={tailwind('text-xl text-white')}>Registrar</Text>
            )}
          </PrimaryButton>
          <View style={tailwind('mb-2 flex flex-row justify-center')}>
            <Text style={tailwind('text-lg')}>Já tem uma conta?</Text>
            <TouchableOpacity onPress={handleChangeToSignIn}>
              <Text style={tailwind('ml-3 text-primary-500 text-lg')}>
                Entre!
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </LayoutModal>
  )
}

SignUp.displayName = 'SignUp'

export default SignUp
