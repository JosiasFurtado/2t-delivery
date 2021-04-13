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
import { addressSchema } from 'utils/schemas'
import cep from 'cep-promise'
import AddressForm from 'components/Form/AddressForm'
import { AddressFormData } from 'types/app'
import { addUserAddressRequest } from 'store/modules/user/actions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/modules/rootReducer'

const InitialAddress: React.FC = () => {
  const { navigate } = useNavigation()
  const formRef = useRef<FormHandles>(null)
  const { activeAddressId } = useSelector(
    (state: RootState) => state.user,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if(activeAddressId) {
      navigate('Home')
    }
  } , [activeAddressId])
  
  const handleSubmitAddress = useCallback(
    async (data: AddressFormData, { reset }) => {
      try {
        formRef.current?.setErrors({})
        await addressSchema.validate(data, {
          abortEarly: false,
        })
        const { cep: zip, street, city, state, neighborhood } = await cep(
          data.zipcode,
        )
        const cepWithoutFormat = zip.split('')
        cepWithoutFormat.splice(5, 0, '-')
        const cepFormated = cepWithoutFormat.join("")

        const dataToSubmit = {
          name: data.name,
          number: Number(data.number),
          aditionalInfo: data.aditionalInfo,
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
    navigate('Login')
  }

  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-primary-500 -mb-10')}>
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
          <AddressForm formRef={formRef}
            handleSubmit={handleSubmitAddress}
          />
            <TouchableOpacity
              onPress={() => formRef.current?.submitForm()}
              style={tailwind(
                'border border-primary-500 rounded-lg items-center py-2 px-8 mb-2',
              )}
            >
              <Text style={tailwind('text-lg text-primary-500')}>Pronto</Text>
            </TouchableOpacity>
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
