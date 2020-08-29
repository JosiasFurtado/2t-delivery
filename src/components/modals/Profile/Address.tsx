import React, { Dispatch, SetStateAction } from 'react'
import { View, Text } from 'react-native'
import { tailwind } from 'lib/styles'
import PrimaryButton from 'components/styledComponents/PrimaryButton'
import LayoutModal from '../LayoutModal'

interface AddressProps {
  readonly open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const Address: React.FC<AddressProps> = ({ open, setOpenModal }) => {
  const handleChangeUserAddress = () => {}

  return (
    <LayoutModal title="Endereço" open={open} setOpenModal={setOpenModal}>
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
    </LayoutModal>
  )
}

Address.displayName = 'Address'

export default Address
