import React, { useMemo } from 'react'
import { StyleProp, ViewStyle, FlatList } from 'react-native'
import { tailwind } from 'lib/styles'
import { Product } from 'types/app'
import ItemCard from 'components/ItemCard'
import { useDispatch } from 'react-redux'
import { addToCartRequest } from 'store/modules/cart/actions'

interface ItemListProps {
  readonly style?: StyleProp<ViewStyle>
  readonly products: Product[]
}

const ItemList: React.FC<ItemListProps> = ({ style, products }) => {
  const dispatch = useDispatch()
  const handleAddProductInCart = (item: Product) => {
    dispatch(addToCartRequest(item))
  }
  const renderItem = ({ item }: { item: Product }) => (
    <ItemCard
      key={item.id}
      product={item}
      onPress={() => handleAddProductInCart(item)}
      style={[tailwind('ml-4 mt-1'), { height: 270 }]}
    />
  )
  const memoizedValue = useMemo(() => renderItem, [products])

  return (
    <FlatList
      data={products}
      horizontal
      pagingEnabled
      maxToRenderPerBatch={30}
      keyExtractor={item => item.id.toString()}
      style={[{ height: 280 }, tailwind('-ml-4 mb-2 -mr-4'), style]}
      showsHorizontalScrollIndicator={false}
      renderItem={memoizedValue}
    />
  )
}
ItemList.displayName = 'ItemList'

export default ItemList
