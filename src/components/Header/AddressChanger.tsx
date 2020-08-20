import React from 'react'
import { StyleProp, TouchableOpacity, ViewStyle, Text } from 'react-native'
import { tailwind, getColor } from 'lib/styles'
import { Octicons } from '@expo/vector-icons'

interface AddressChangerProps {
  readonly style?: StyleProp<ViewStyle>
}

const AddressChanger: React.FC<AddressChangerProps> = ({ style }) => {
  const mockStreet = 'Rua Lorem Ipsum'
  return (
    <TouchableOpacity
      style={[
        style,
        tailwind('bg-white rounded w-32 py-1 px-1 flex-row items-center'),
      ]}
    >
      <Octicons name="location" size={16} color={getColor('primary-500')} />
      <Text style={tailwind('ml-1 font-medium w-32')}>
        {mockStreet.slice(0, 12) + '...'}
      </Text>
    </TouchableOpacity>
  )
}

AddressChanger.displayName = 'AddressChanger'

export default AddressChanger
