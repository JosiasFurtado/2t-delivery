import React, { useState } from 'react'
import { StyleProp, TouchableOpacity, ViewStyle, Text } from 'react-native'
import { tailwind, getColor } from 'lib/styles'
import { AntDesign, Octicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { RootState } from 'store/modules/rootReducer'
import { ProfileModals } from 'types/app'
import ProfileModal from 'components/modals/Profile'

interface AddressChangerProps {
  readonly style?: StyleProp<ViewStyle>
}

const AddressChanger: React.FC<AddressChangerProps> = ({ style }) => {
  const { addresses, activeAddressId } = useSelector((state: RootState) => state.user)
  const [openModal, setOpenModal] = useState(false)
  const [typeModal, setTypeModal] = useState<ProfileModals>('address')

  const activeAdress = addresses?.find(address => address.id === activeAddressId)

  const openAddressModal = () => {
    setTypeModal('address')
    setOpenModal(true)
  }

  return (
    <>
      <TouchableOpacity
        onPress={openAddressModal}
        style={[
          style,
          tailwind('z-10 py-1 px-1 flex-row items-center border rounded border-white'),
        ]}
      >
        <Octicons name="location" size={16} color={getColor('white')} />
        <Text
          numberOfLines={1}
          lineBreakMode="tail"
          style={tailwind('ml-1 w-24 font-medium text-white')}
        >
          {activeAdress && `${activeAdress.street}, ${activeAdress.city}`}
        </Text>
        <AntDesign name="down" size={16} color="white" />
      </TouchableOpacity>
      <ProfileModal
        open={openModal}
        setOpenModal={setOpenModal}
        setTypeModal={setTypeModal}
        type={typeModal}
      />
    </>
  )
}

AddressChanger.displayName = 'AddressChanger'

export default AddressChanger
