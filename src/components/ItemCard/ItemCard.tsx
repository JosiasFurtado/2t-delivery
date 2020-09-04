import React, { useState } from 'react'
import {
  StyleProp,
  View,
  ViewStyle,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native'
import { tailwind } from 'lib/styles'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import AddAndRemoveBtns from 'components/styledComponents/AddAndRemoveBtns'
import { useSelector, useDispatch } from 'react-redux'
import { ProductInCart, Product } from 'types/app'
import { RootState } from 'store/modules/rootReducer'
import { updateAmountRequest, removeFromCart } from 'store/modules/cart/actions'
import formatPrice from 'utils/formatPrice'

interface ItemCardProps {
  readonly style?: StyleProp<ViewStyle>
  readonly product: Product
  onPress(): void
}

const ItemCard: React.FC<ItemCardProps> = ({ style, onPress, product }) => {
  const dispatch = useDispatch()
  const { navigate } = useNavigation()
  const productAlreadyInCart = useSelector((state: RootState) =>
    state.cart.find(
      (productInCart: ProductInCart) => productInCart.id === product.id,
    ),
  )
  const priceFormated = formatPrice(product.price)
  const handleIncreasesItemAmount = () => {
    if (productAlreadyInCart) {
      dispatch(updateAmountRequest(product.id, productAlreadyInCart.amount + 1))
    }
  }

  const handleDecreasesItemAmount = () => {
    if (productAlreadyInCart) {
      if (productAlreadyInCart.amount === 1) {
        return dispatch(removeFromCart(product.id))
      }
      dispatch(updateAmountRequest(product.id, productAlreadyInCart.amount - 1))
    }
  }

  return (
    <View
      style={[
        style,
        tailwind(
          'bg-white shadow-md justify-between rounded-lg w-48 px-2 py-2',
        ),
        { borderColor: '#edf2f7', borderWidth: 1 },
      ]}
    >
      <TouchableHighlight
        underlayColor="#fff"
        onPress={() => navigate('ItemPage')}
      >
        <View>
          <Image
            style={[
              tailwind('w-full h-32 rounded-lg mb-1'),
              { borderColor: '#edf2f7', borderWidth: 2 },
            ]}
            resizeMode="cover"
            source={{
              uri: product.img,
            }}
          />
          <View style={tailwind('flex-row items-start justify-between')}>
            <Text
              numberOfLines={1}
              lineBreakMode="tail"
              style={tailwind('text-sm font-bold mb-1 w-1/2')}
            >
              {product.name}
            </Text>
            <Text style={tailwind('text-base font-bold text-primary-500')}>
              {priceFormated}
            </Text>
          </View>
          <Text
            numberOfLines={3}
            lineBreakMode="tail"
            style={tailwind('text-base mb-2 text-gray-600 text-justify')}
          >
            {product.description}
          </Text>
        </View>
      </TouchableHighlight>
      {!productAlreadyInCart ? (
        <TouchableOpacity
          onPress={() => onPress()}
          style={tailwind('bg-primary-500 py-1 rounded')}
        >
          <View style={tailwind('flex-row items-center justify-center')}>
            <MaterialIcons name="add-shopping-cart" size={16} color="#fff" />
            <Text style={tailwind('text-white text-lg ml-1')}>Adicionar</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={tailwind('items-center')}>
          <AddAndRemoveBtns
            amount={productAlreadyInCart.amount}
            handleDecreasesItemAmount={handleDecreasesItemAmount}
            handleIncreasesItemAmount={handleIncreasesItemAmount}
          />
        </View>
      )}
    </View>
  )
}

ItemCard.displayName = 'ItemCard'

export default ItemCard
