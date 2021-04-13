import React, { useMemo } from 'react'
import {
  StyleProp,
  ViewStyle,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { tailwind } from 'lib/styles'
import { MarketWithCategories, Product } from 'types/app'
import ItemCard from 'components/ItemCard'
import { useDispatch } from 'react-redux'
import { addToCartRequest } from 'store/modules/cart/actions'
import formatString from 'utils/formatString'
import { useNavigation } from '@react-navigation/native'

interface ItemListProps {
  readonly style?: StyleProp<ViewStyle>
  readonly products: Product[]
  readonly categoryName?: string
  readonly title?: string
  readonly market: MarketWithCategories
  readonly subcategoryList: Product[]
}

const ItemList: React.FC<ItemListProps> = ({
  style,
  products,
  title,
  market,
  subcategoryList,
  categoryName,
}) => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const handleAddProductInCart = (item: Product) => {
    dispatch(addToCartRequest(item, market))
  }
  const renderItem = ({ item }: { item: Product }) => (
    <ItemCard
      key={item.id}
      product={item}
      market={market}
      subcategoryList={subcategoryList}
      onPress={() => handleAddProductInCart(item)}
      style={tailwind('ml-4 mt-1 mb-1')}
    />
  )
  const memoizedValue = useMemo(() => renderItem, [products])

  return (
    <>
      {title && (
        <View style={tailwind('flex-row justify-between items-center mb-1')}>
          <Text style={tailwind('text-lg')}>
            {categoryName && formatString(categoryName)} -{' '}
            {title && formatString(title)}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigate('StoreFiltersPage', {
                activeFilter: categoryName,
                activeSubFilter: title,
                market,
              })
            }
          >
            <Text style={tailwind('text-lg text-primary-500')}>Ver mais</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={products}
        horizontal
        maxToRenderPerBatch={30}
        keyExtractor={item => item.id.toString()}
        style={[tailwind('-ml-4 mb-2 -mr-4'), style]}
        showsHorizontalScrollIndicator={false}
        renderItem={memoizedValue}
      />
    </>
  )
}
ItemList.displayName = 'ItemList'

export default ItemList
