import React, { Dispatch, SetStateAction } from 'react'
import { View, Text, Modal, StatusBar, TouchableOpacity } from 'react-native'
import { tailwind, getColor } from 'lib/styles'
import { Ionicons } from '@expo/vector-icons'
import PrimaryButton from 'components/styledComponents/PrimaryButton'
import { BgModal } from '../LoginModal'

interface AddressProps {
  readonly open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const Address: React.FC<AddressProps> = ({ open, setOpenModal }) => {
  const handleChangeUserAddress = () => {}

  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent
      onRequestClose={() => setOpenModal(false)}
    >
      <StatusBar
        backgroundColor={getColor('primary-700')}
        barStyle="light-content"
      />
      <BgModal>
        <TouchableOpacity
          onPress={() => setOpenModal(!open)}
          style={tailwind('px-5 mb-4')}
        >
          <Ionicons name="md-arrow-back" size={35} color="#fff" />
        </TouchableOpacity>
        <Text style={tailwind('px-5 mb-4 text-3xl text-white')}>Endereço</Text>
        <View style={tailwind('rounded-t-lg bg-white px-5 py-3')}>
          <Text style={tailwind('text-primary-500 text-2xl font-medium pt-4')}>
            Quer alterar o seu endereço?
          </Text>
          <Text style={tailwind('text-gray-500 text-lg mb-16')}>
            Escolha um dos que já cadastrou ou cadastre um novo
          </Text>
          <PrimaryButton
            onPress={handleChangeUserAddress}
            style={tailwind('mb-8')}
          >
            <Text style={tailwind('text-xl text-white')}>Alterar</Text>
          </PrimaryButton>
        </View>
      </BgModal>
    </Modal>
  )
}

Address.displayName = 'Address'

export default Address
