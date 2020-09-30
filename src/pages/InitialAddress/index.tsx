import React, { useRef, useCallback, useState } from 'react'
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
import { Form } from '@unform/mobile'
import Input from 'components/Form/Input'
import StoresLocation from '../../../assets/png/stores-location.png'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import getValidationsErrors from 'utils/getValidationsErrors'
import { useNavigation } from '@react-navigation/native'
import { cepSchema } from 'utils/schemas'
import cep from 'cep-promise'

const InitialAddress: React.FC = () => {
  const { navigate } = useNavigation()
  const formRef = useRef<FormHandles>(null)
  const [cepError, setCepError] = useState<string | undefined>()

  const handleSubmit = useCallback(async (data: { cep: string }, { reset }) => {
    try {
      formRef.current?.setErrors({})
      await cepSchema.validate(data, {
        abortEarly: false,
      })
      const { cep: zipcode, street, city, state, neighborhood } = await cep(
        data.cep,
      )
      const dataToSubmit = {
        name: 'Primeiro acesso',
        number: 0,
        aditionalInfo: 'primeiro acesso',
        zipcode,
        street,
        city,
        state,
        neighborhood,
      }
      console.warn(dataToSubmit)
      console.warn('endereço:', `${street}, 175, ${neighborhood}, ${state}`)
      // navigate('Home')
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationsErrors(error)

        formRef.current?.setErrors(errors)
        setCepError('CEP inválido')
        return
      }
    }
  }, [])

  const handleRedirectToLogin = () => {
    navigate('Login')
  }

  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-white')}>
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
          style={tailwind('pt-8 text-2xl text-primary-500 font-medium mb-10')}
        >
          Conte-nos onde você está
        </Text>
        <View style={tailwind('items-center')}>
          <Text style={tailwind('text-lg text-gray-700 mb-2')}>
            Digite seu CEP
          </Text>
          {cepError && (
            <Text style={tailwind('text-red-600 text-base')}>{cepError}</Text>
          )}
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            style={tailwind('mb-12 w-1/3')}
          >
            <Input
              name="cep"
              textContentType="postalCode"
              placeholder="xxxxx-xxx"
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
InitialAddress.displayName = 'InitialAddress'

export default InitialAddress
