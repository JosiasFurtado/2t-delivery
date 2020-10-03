import React, { Dispatch, SetStateAction } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { tailwind } from 'lib/styles'
import PrimaryButton from 'components/styledComponents/PrimaryButton'
import LayoutModal from '../LayoutModal'
import { useDispatch } from 'react-redux'
import { ProfileModals } from 'types/app'

interface NewAddressProps {
  readonly open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  setTypeModal: Dispatch<SetStateAction<ProfileModals>>
}

const NewAddress: React.FC<NewAddressProps> = ({ open, setOpenModal, setTypeModal }) => {
  const dispatch = useDispatch()

  const handleSubmitAddress = () => {
    // address
  }

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
          <Text>form de cadastro de endereço</Text>
        </View>
        <PrimaryButton
          onPress={handleSubmitAddress}
          style={tailwind('mb-4')}
        >
          <Text style={tailwind('text-xl text-white')}>Confirmar</Text>
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
