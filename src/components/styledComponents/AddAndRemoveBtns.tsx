import React from 'react'
import {
  StyleProp,
  Text,
  View,
  ViewStyle,
  TouchableHighlight,
} from 'react-native'
import { tailwind, getColor } from 'lib/styles'
import { Ionicons } from '@expo/vector-icons'

interface AddAndRemoveBtnsProps {
  readonly style?: StyleProp<ViewStyle>
  handleDecreasesItemQuantity(): void
  handleIncreasesItemQuantity(): void
  quantity: number
}

const AddAndRemoveBtns: React.FC<AddAndRemoveBtnsProps> = ({
  style,
  quantity,
  handleIncreasesItemQuantity,
  handleDecreasesItemQuantity,
}) => {
  const quantityMock = quantity
  return (
    <View style={tailwind('flex-row items-center')}>
      <TouchableHighlight
        underlayColor={getColor('gray-200')}
        onPress={handleDecreasesItemQuantity}
        style={tailwind(
          `bg-white border-2 w-8 h-8 justify-center items-center rounded ${
            quantityMock > 1 ? 'border-primary-500' : 'border-gray-500'
          }`,
        )}
      >
        <Ionicons
          name="ios-remove"
          size={24}
          color={getColor(`${quantityMock > 1 ? 'primary-500' : 'gray-500'}`)}
        />
      </TouchableHighlight>
      <Text style={tailwind('text-2xl bg-gray-200 font-medium px-2')}>
        {quantityMock}
      </Text>
      <TouchableHighlight
        underlayColor={getColor('gray-200')}
        onPress={handleIncreasesItemQuantity}
        style={tailwind(
          'bg-white border-2 border-primary-500 w-8 h-8 justify-center items-center rounded',
        )}
      >
        <Ionicons name="ios-add" size={24} color={getColor('primary-500')} />
      </TouchableHighlight>
    </View>
  )
}

AddAndRemoveBtns.displayName = 'AddAndRemoveBtns'

export default AddAndRemoveBtns
