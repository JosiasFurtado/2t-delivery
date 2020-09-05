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
import { useDispatch } from 'react-redux'
import { removeFromCart, updateAmountRequest } from 'store/modules/cart/actions'
import { ProductWithSubtotal } from 'types/app'

interface ItemCartProps {
  readonly style?: StyleProp<ViewStyle>
  readonly product: ProductWithSubtotal
  openCommitModal(x: string): void
}

const ItemCart: React.FC<ItemCartProps> = ({
  style,
  openCommitModal,
  product,
}) => {
  const dispatch = useDispatch()
  const handleIncreasesItemAmount = () => {
    dispatch(updateAmountRequest(product.id, product.amount + 1))
  }

  const handleDecreasesItemAmount = () => {
    if (product.amount === 1) {
      return
    }
    dispatch(updateAmountRequest(product.id, product.amount - 1))
  }
  const handleDeleteItem = (id: string) => {
    dispatch(removeFromCart(id))
  }

  return (
    <View style={[tailwind('w-full mb-2'), style]}>
      <View
        style={tailwind(
          'flex-row justify-between border-b pb-3 border-gray-500',
        )}
      >
        <View style={tailwind('flex-row items-center w-1/2')}>
          <TouchableOpacity
            onPress={() => handleDeleteItem(product.id)}
            style={tailwind('h-6 w-6')}
          >
            <FontAwesome5 name="trash" size={20} color={getColor('gray-500')} />
          </TouchableOpacity>
          <Image
            resizeMode="cover"
            style={[
              tailwind('rounded h-10 w-10 ml-2'),
              { borderColor: '#c4c4c4', borderWidth: 1 },
            ]}
            source={{
              uri: `${product.img}`,
            }}
          />
          <View style={tailwind('ml-2 w-3/5')}>
            <Text
              lineBreakMode="tail"
              numberOfLines={1}
              style={tailwind('text-base font-bold')}
            >
              {product.name}
            </Text>
            <Text
              lineBreakMode="tail"
              numberOfLines={1}
              style={tailwind('text-sm')}
            >
              {product.priceFormatted}
            </Text>
            <TouchableOpacity
              onPress={() => openCommitModal(product.commit)}
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
          amount={product.amount}
          handleIncreasesItemAmount={handleIncreasesItemAmount}
          handleDecreasesItemAmount={handleDecreasesItemAmount}
        />
        <View style={tailwind('justify-center')}>
          <Text style={tailwind('text-sm w-16 text-right')}>
            {product.subtotal}
          </Text>
        </View>
      </View>
    </View>
  )
}

ItemCart.displayName = 'ItemCart'

export default ItemCart
