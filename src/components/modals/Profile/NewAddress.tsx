import React, { Dispatch, SetStateAction, useCallback, useRef } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { tailwind } from 'lib/styles'
import PrimaryButton from 'components/styledComponents/PrimaryButton'
import LayoutModal from '../LayoutModal'
import { useDispatch, useSelector } from 'react-redux'
import { AddressFormData, ProfileModals } from 'types/app'
import AddressForm from 'components/Form/AddressForm'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import getValidationsErrors from 'utils/getValidationsErrors'
import { addressSchema } from 'utils/schemas'
import cep from 'cep-promise'
import { addUserAddressRequest } from 'store/modules/user/actions'
import { RootState } from 'store/modules/rootReducer'

interface NewAddressProps {
  readonly open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  setTypeModal: Dispatch<SetStateAction<ProfileModals>>
}

const NewAddress: React.FC<NewAddressProps> = ({ open, setOpenModal, setTypeModal }) => {
  const { loading } = useSelector((state: RootState) => state.user)
  const formRef = useRef<FormHandles>(null)
  const dispatch = useDispatch()

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
          return
        }
      }
      setOpenModal(false)
      // reset()
    },
    [],
  )

  const openAddressModal = () => {
    setOpenModal(false)
    setTypeModal('address')
    setOpenModal(true)
  }

  return (
    <LayoutModal title="Novo endereço" open={open} setOpenModal={setOpenModal}>
      <View style={tailwind('rounded-t-lg bg-white px-5 pt-3 pb-12')}>
        <Text style={tailwind('text-primary-500 text-2xl font-medium pt-4')}>
          Onde quer receber as suas compras?
        </Text>
        <Text style={tailwind('text-gray-500 text-lg mb-6')}>
          Pode ser na sua casa ou na da sua vó, você decide
        </Text>
        <View>
          <AddressForm formRef={formRef}
            handleSubmit={handleSubmitAddress}
            style={tailwind('mb-4')} />
        </View>
        <PrimaryButton
          onPress={() => formRef.current?.submitForm()}
          style={tailwind('mb-4')}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size={28} />
          ) : (
              <Text style={tailwind('text-xl text-white')}>Confirmar</Text>
            )}
        </PrimaryButton>
        <TouchableOpacity onPress={openAddressModal} style={tailwind('mb-2 items-center')}>
          <Text style={tailwind('text-primary-500')}>Escolher um endereço já cadastrado</Text>
        </TouchableOpacity>
      </View>
    </LayoutModal>
  )
}

NewAddress.displayName = 'NewAddress'

export default NewAddress
