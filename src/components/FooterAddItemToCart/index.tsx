import React, { useState } from 'react'
import {
  StyleProp,
  View,
  ViewStyle,
  TouchableHighlight,
  Text,
  TouchableOpacity,
} from 'react-native'
import { getColor, tailwind } from 'lib/styles'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import formatPrice from 'utils/formatPrice'
import { Product } from 'types/app'
import { useDispatch } from 'react-redux'
import { addToCartRequest } from 'store/modules/cart/actions'

interface FooterAddItemToCartProps {
  readonly style?: StyleProp<ViewStyle>
  readonly product: Product
  readonly comment: string | undefined
}

const FooterAddItemToCart: React.FC<FooterAddItemToCartProps> = ({
  style,
  product,
  comment,
}) => {
  const dispatch = useDispatch()
  const { navigate } = useNavigation()
  const [quantityMock, setQuantityMock] = useState(1)

  const itemPriceMultipliedByAmount = parseFloat(
    (product.price * quantityMock).toFixed(2),
  )
  const itemPriceMultipliedWithComma = formatPrice(itemPriceMultipliedByAmount)

  const handleAddItemToCart = () => {
    dispatch(addToCartRequest(product, quantityMock, comment))
    navigate('Carrinho')
  }

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
    <View
      style={[
        tailwind('bg-white px-4 w-full pb-8 -mb-10 pt-1 border border-gray-300'),
        style,
      ]}
    >
      <View style={tailwind('flex-row items-center')}>
        <TouchableOpacity
          onPress={handleAddItemToCart}
          style={tailwind('bg-primary-500 rounded w-8/12 mr-1')}
        >
          <View
            style={tailwind('flex-row px-2 justify-between py-2 items-center')}
          >
            <View style={tailwind('flex-row items-center')}>
              <MaterialIcons name="add-shopping-cart" size={18} color="#fff" />
              <Text style={tailwind('text-white text-xl ml-1')}>Adicionar</Text>
            </View>
            <Text style={tailwind('text-white text-xl')}>
              {itemPriceMultipliedWithComma}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={tailwind('flex-row items-center')}>
          <TouchableHighlight
            underlayColor={getColor('gray-200')}
            onPress={handleDecreasesItemQuantity}
            style={tailwind(
              `bg-white border-2 px-3 py-1 rounded ${quantityMock > 1 ? 'border-primary-500' : 'border-gray-500'
              }`,
            )}
          >
            <Ionicons
              name="ios-remove"
              size={31}
              color={getColor(
                `${quantityMock > 1 ? 'primary-500' : 'gray-500'}`,
              )}
            />
          </TouchableHighlight>
          <Text style={tailwind('text-2xl bg-gray-200 font-medium px-3 py-1')}>
            {quantityMock}
          </Text>
          <TouchableHighlight
            underlayColor={getColor('gray-200')}
            onPress={handleIncreasesItemQuantity}
            style={tailwind(
              'bg-white border-2 border-primary-500 px-3 py-1 rounded',
            )}
          >
            <Ionicons
              name="ios-add"
              size={31}
              color={getColor('primary-500')}
            />
          </TouchableHighlight>
        </View>
      </View>
    </View>
  )
}

FooterAddItemToCart.displayName = 'FooterAddItemToCart'

export default FooterAddItemToCart
