import React, { useRef, useCallback, useEffect } from 'react'
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import { tailwind } from 'lib/styles'
import { Ionicons } from '@expo/vector-icons'
import StoresLocation from '../../../assets/png/stores-location.png'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import getValidationsErrors from 'utils/getValidationsErrors'
import { useNavigation } from '@react-navigation/native'
import { cepSchema } from 'utils/schemas'
import cep from 'cep-promise'
import { addUserAddressRequest } from 'store/modules/user/actions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/modules/rootReducer'
import { Form } from '@unform/mobile'
import Input from 'components/Form/Input'
import Toast from 'components/Toast'
import { signOut } from 'store/modules/auth/actions'

const VisitorInitialAddress: React.FC = () => {
  const { navigate } = useNavigation()
  const formRef = useRef<FormHandles>(null)
  const { activeAddressId } = useSelector((state: RootState) => state.user)
  const { error: reduxError } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (activeAddressId) {
      navigate('Home')
    }
  }, [activeAddressId])

  const handleSubmitAddress = useCallback(
    async (data: { cep: string }, { reset }) => {
      try {
        formRef.current?.setErrors({})
        await cepSchema.validate(data, {
          abortEarly: false,
        })
        const { cep: zip, street, city, state, neighborhood } = await cep(
          data.cep,
        )
        const cepWithoutFormat = zip.split('')
        cepWithoutFormat.splice(5, 0, '-')
        const cepFormated = cepWithoutFormat.join('')

        const dataToSubmit = {
          name: 'Visitante',
          number: 1,
          aditionalInfo: 'Visitante',
          zipcode: cepFormated,
          street,
          city,
          state,
          neighborhood,
        }
        dispatch(addUserAddressRequest(dataToSubmit))
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(error)

          formRef.current?.setErrors(errors)
        }
      }
      // reset()
    },
    [],
  )

  const handleRedirectToLogin = () => {
    dispatch(signOut())
    navigate('Login')
  }

  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-primary-500 -mb-10')}>
      <Toast error={reduxError} />
      <View style={tailwind('h-32 bg-primary-500')}>
        <TouchableOpacity
          onPress={handleRedirectToLogin}
          style={tailwind('p-4')}
        >
          <Ionicons name="md-arrow-back" size={35} color="#fff" />
        </TouchableOpacity>
        <Text style={tailwind('px-4 text-2xl text-white font-medium')}>
          Antes de começar
        </Text>
      </View>
      <ScrollView style={tailwind('bg-white rounded-t-xl -mt-4 px-4')}>
        <Text
          style={tailwind('pt-8 text-2xl text-primary-500 font-medium mb-4')}
        >
          Conte-nos onde você está
        </Text>
        <View style={tailwind('items-center')}>
          <Form
            ref={formRef}
            onSubmit={handleSubmitAddress}
            style={tailwind('mb-12 w-1/3 py-8')}
          >
            <Input
              name="cep"
              textContentType="postalCode"
              placeholder="99099099"
              keyboardType="number-pad"
              returnKeyType="done"
              style={tailwind('text-lg mb-6 text-center')}
              maxLength={8}
              autoCompleteType="postal-code"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
            <TouchableOpacity
              onPress={() => formRef.current?.submitForm()}
              style={tailwind(
                'border border-primary-500 rounded-lg items-center py-2',
              )}
            >
              <Text style={tailwind('text-lg text-primary-500')}>Pronto</Text>
            </TouchableOpacity>
          </Form>
          <Image
            source={StoresLocation}
            resizeMode="contain"
            style={tailwind('w-3/4 h-56')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
VisitorInitialAddress.displayName = 'VisitorInitialAddress'

export default VisitorInitialAddress
