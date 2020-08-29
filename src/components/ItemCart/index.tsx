import React from 'react'
import {
  StyleProp,
  Text,
  View,
  ViewStyle,
  TouchableOpacity,
  Image,
} from 'react-native'
import { tailwind, getColor } from 'lib/styles'
import { FontAwesome5 } from '@expo/vector-icons'
import AddAndRemoveBtns from 'components/styledComponents/AddAndRemoveBtns'

interface ItemCartProps {
  readonly style?: StyleProp<ViewStyle>
  readonly itemPrice: number
  setQuantityMock: any
  quantityMock: number
  openCommitModal(): void
}

const ItemCart: React.FC<ItemCartProps> = ({
  style,
  itemPrice,
  setQuantityMock,
  quantityMock,
  openCommitModal,
}) => {
  const itemPriceMultipliedByQuantity = parseFloat(
    (itemPrice * quantityMock).toFixed(2),
  )
  const itemPriceMultipliedWithComma = String(
    itemPriceMultipliedByQuantity,
  ).replace('.', ',')

  const handleIncreasesItemQuantity = () => {
    setQuantityMock(quantityMock + 1)
  }

  const handleDecreasesItemQuantity = () => {
    if (quantityMock === 1) {
      return
    }
    setQuantityMock(quantityMock - 1)
  }

  return (
    <View style={[tailwind('w-full mb-2'), style]}>
      <View
        style={tailwind(
          'flex-row justify-between border-b pb-3 border-gray-500',
        )}
      >
        <View style={tailwind('flex-row items-center w-1/2')}>
          <TouchableOpacity style={tailwind('h-6 w-6')}>
            <FontAwesome5 name="trash" size={20} color={getColor('gray-500')} />
          </TouchableOpacity>
          <Image
            resizeMode="cover"
            style={[
              tailwind('rounded h-10 w-10 ml-2'),
              { borderColor: '#c4c4c4', borderWidth: 1 },
            ]}
            source={{
              uri: 'https://belezaesaude.com/i/730/56/tomate.jpg',
            }}
          />
          <View style={tailwind('ml-2 w-3/5')}>
            <Text
              lineBreakMode="tail"
              numberOfLines={1}
              style={tailwind('text-base font-bold')}
            >
              Tomates 1kg
            </Text>
            <Text
              lineBreakMode="tail"
              numberOfLines={1}
              style={tailwind('text-base')}
            >
              R$ 11,99
            </Text>
            <TouchableOpacity
              onPress={openCommitModal}
              style={tailwind('flex-row items-center')}
            >
              <FontAwesome5
                name="edit"
                size={12}
                color={getColor('gray-600')}
              />
              <Text
                lineBreakMode="tail"
                numberOfLines={1}
                style={tailwind('text-xs text-gray-600')}
              >
                observações
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <AddAndRemoveBtns
          quantity={quantityMock}
          handleIncreasesItemQuantity={handleIncreasesItemQuantity}
          handleDecreasesItemQuantity={handleDecreasesItemQuantity}
        />
        <View style={tailwind('justify-center')}>
          <Text style={tailwind('text-lg')}>
            {itemPriceMultipliedWithComma}
          </Text>
        </View>
      </View>
    </View>
  )
}

ItemCart.displayName = 'ItemCart'

export default ItemCart
