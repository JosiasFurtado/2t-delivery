import React from 'react'
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
import { ProductInCart, Product, Market } from 'types/app'
import { RootState } from 'store/modules/rootReducer'
import { updateAmountRequest, removeFromCart } from 'store/modules/cart/actions'
import formatPrice from 'utils/formatPrice'

interface ItemCardProps {
  readonly style?: StyleProp<ViewStyle>
  readonly product: Product
  readonly market: Market
  readonly subcategoryList?: Product[]
  readonly inColumns?: boolean
  onPress(): void
}

const ItemCard: React.FC<ItemCardProps> = ({
  style,
  inColumns,
  onPress,
  product,
  market,
  subcategoryList,
}) => {
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
    return null
  }

  const haveVolumeOrWeight = product.volume || product.weight
  return (
    <View
      style={[
        style,
        tailwind(
          `bg-white relative shadow-md justify-between rounded-lg px-2 py-2 ${
            inColumns ? 'w-48p' : 'w-48'
          }`,
        ),
        { borderColor: '#edf2f7', borderWidth: 1 },
      ]}
    >
      {product.isExclusive && (
        <View
          style={tailwind(
            'bg-primary-500 rounded-full px-4 left-0 right-0 absolute z-50 ml-2 mr-2 mt-2',
          )}
        >
          <Text style={tailwind('text-base text-white text-center')}>
            Exclusivo no app
          </Text>
        </View>
      )}
      <TouchableHighlight
        underlayColor="#fff"
        onPress={() =>
          navigate('ItemPage', { product, market, subcategoryList })
        }
      >
        <View>
          <Image
            style={[
              tailwind('w-full h-32 rounded-lg mb-1'),
              { borderColor: '#edf2f7', borderWidth: 2 },
            ]}
            resizeMode="cover"
            source={{
              uri: product.imageUrl,
            }}
          />
          <View style={tailwind('flex items-start')}>
            <Text
              numberOfLines={1}
              lineBreakMode="tail"
              style={tailwind('text-base font-bold')}
            >
              {product.name}
            </Text>
            {haveVolumeOrWeight && (
              <Text style={tailwind('text-sm text-gray-700 mb-1')}>
                {product.volume && `${product.volume}ml`}
                {product.weight && `${product.weight}g`}
              </Text>
            )}
            {product.description && (
              <Text
                numberOfLines={3}
                lineBreakMode="tail"
                style={tailwind('text-gray-800 mb-1')}
              >
                {product.description}
              </Text>
            )}
          </View>
        </View>
      </TouchableHighlight>
      <View>
        {product.promotionPrice ? (
          <View
            style={tailwind('flex flex-row justify-center items-center mb-px')}
          >
            <Text style={tailwind('text-xl font-bold text-primary-500 mr-2')}>
              {formatPrice(product.promotionPrice)}
            </Text>
            <View style={tailwind('flex items-center justify-center')}>
              <Text
                style={tailwind('text-sm font-bold text-gray-500 relative')}
              >
                {priceFormated}
              </Text>
              <View style={tailwind('h-px w-12 bg-gray-500 absolute')} />
            </View>
          </View>
        ) : (
          <View
            style={tailwind('flex flex-row justify-center items-center mb-px')}
          >
            <Text style={tailwind('text-xl font-bold text-primary-500 mr-2')}>
              {priceFormated}
            </Text>
          </View>
        )}
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
    </View>
  )
}

ItemCard.displayName = 'ItemCard'

export default ItemCard
