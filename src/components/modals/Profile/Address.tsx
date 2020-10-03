import React, { Dispatch, SetStateAction } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { tailwind } from 'lib/styles'
import PrimaryButton from 'components/styledComponents/PrimaryButton'
import LayoutModal from '../LayoutModal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/modules/rootReducer'
import AddressList from 'components/List/AddressList'
import { updateUserAddressActive } from 'store/modules/user/actions'
import { ProfileModals } from 'types/app'

interface AddressProps {
  readonly open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  setTypeModal: Dispatch<SetStateAction<ProfileModals>>
}

const Address: React.FC<AddressProps> = ({ open, setOpenModal, setTypeModal }) => {
  const dispatch = useDispatch()
  const { addresses, activeAddressId } = useSelector((state: RootState) => state.user)
  const [checked, setChecked] = React.useState(String(activeAddressId))

  const handleChangeUserAddress = () => {
    dispatch(updateUserAddressActive(Number(checked)))
    setOpenModal(false)
  }

  const openNewAddressModal = () => {
    setOpenModal(false)
    setTypeModal('newAddress')
    setOpenModal(true)
  }

  return (
    <LayoutModal title="Endereço" open={open} setOpenModal={setOpenModal}>
      <View style={tailwind('rounded-t-lg bg-white px-5 pt-3 pb-12')}>
        <Text style={tailwind('text-primary-500 text-2xl font-medium pt-4')}>
          Quer alterar o seu endereço?
        </Text>
        <Text style={tailwind('text-gray-500 text-lg mb-6')}>
          Escolha um dos que já cadastrou ou cadastre um novo
        </Text>
        <AddressList style={tailwind('mb-4')} addresses={addresses} checked={checked} setChecked={setChecked} />
        <PrimaryButton
          onPress={handleChangeUserAddress}
          style={tailwind('mb-4')}
        >
          <Text style={tailwind('text-xl text-white')}>Alterar</Text>
        </PrimaryButton>
        <TouchableOpacity onPress={openNewAddressModal} style={tailwind('mb-2 items-center')}>
          <Text style={tailwind('text-primary-500')}>Cadastre um novo endereço</Text>
        </TouchableOpacity>
      </View>
    </LayoutModal>
  )
}

Address.displayName = 'Address'

export default Address
