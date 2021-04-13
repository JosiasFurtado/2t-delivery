/* eslint-disable @typescript-eslint/ban-ts-comment */
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
  Linking,
} from 'react-native'
import { tailwind } from 'lib/styles'
import { LoginModals, SignUpFormData } from 'types/app'
import PrimaryButton from 'components/styledComponents/PrimaryButton'
import SignUpForm from 'components/Form'
import { FormHandles } from '@unform/core'
import LayoutModal from '../LayoutModal'
import * as Yup from 'yup'
import getValidationsErrors from 'utils/getValidationsErrors'
import { useSelector, useDispatch, connect } from 'react-redux'
import { RootState } from 'store/modules/rootReducer'
import { signUpRequest } from 'store/modules/auth/actions'
import { signUpSchema } from 'utils/schemas'

interface SignUpProps {
  readonly open: boolean
  readonly error: string[] | null
  setOpenModal: Dispatch<SetStateAction<boolean>>
  setTypeModal: Dispatch<SetStateAction<LoginModals>>
}

const SignUp: React.FC<SignUpProps> = ({
  open,
  setOpenModal,
  setTypeModal,
  error,
}) => {
  const dispatch = useDispatch()
  const formRef = useRef<FormHandles>(null)
  const { loading } = useSelector((state: RootState) => state.auth)
  const [apiError, setApiError] = useState<string | null>()

  const handleSubmitSignUp = useCallback(
    async (data: SignUpFormData, { reset }) => {
      try {
        setApiError(null)
        await signUpSchema.validate(data, {
          abortEarly: false,
        })

        const dataToSubmit = {
          ...data,
          type: 'BUYER',
          gender: 'M',
          boarnDate: '1970-01-01',
        }
        dispatch(signUpRequest(dataToSubmit))
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err)
          formRef.current?.setErrors(errors)
        } else {
          if (data.password !== data.confirmPassword) {
            setApiError('Senha e confirmação de senha estão diferentes')
            return
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

  const handleOpenTerms = () => {
    Linking.openURL(
      `https://2tdelivery.com.br/static/termos_e_condicoes_de_uso_2t.pdf`,
    )
  }

  return (
    <LayoutModal title="Registrar" open={open} setOpenModal={setOpenModal}>
      <View style={tailwind('rounded-t-lg bg-white px-5 pt-3 pb-12')}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={tailwind('text-primary-500 text-2xl font-medium pt-4')}>
            Conte um pouco sobre você!
          </Text>
          <Text style={tailwind('text-gray-500 text-lg mb-8')}>
            Preencha os dados para continuar
          </Text>
          {error?.map((item, index) => (
            <Text
              key={index.toString()}
              style={tailwind('mb-1 text-base text-red-500')}
            >
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
          <TouchableOpacity onPress={handleOpenTerms} style={tailwind('mb-3')}>
            <Text style={tailwind('text-center')}>
              Ao realizar o cadastro você aceita os{' '}
              <Text style={tailwind('text-primary-500 ml-2 mr-2')}>
                termos de uso
              </Text>{' '}
              e o envio de promoções.
            </Text>
          </TouchableOpacity>
          <PrimaryButton
            onPress={() => formRef.current?.submitForm()}
            style={tailwind('mb-3')}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size={28} />
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

const mapStateToProps = (state: RootState) => ({
  error: state.auth.error,
})

export default connect(mapStateToProps)(SignUp)
