import ItemCard from 'components/ItemCard'
import { tailwind } from 'lib/styles'
import React, { useMemo } from 'react'
import { FlatList, StyleProp, ViewStyle } from 'react-native'
import { useDispatch } from 'react-redux'
import { addToCartRequest } from 'store/modules/cart/actions'
import { Market, Product } from 'types/app'

interface ItemListTwoColumnsProps {
  readonly style?: StyleProp<ViewStyle>
  readonly products: Product[]
  readonly market: Market
  readonly subcategoryList: Product[]
}

const ItemListTwoColumns: React.FC<ItemListTwoColumnsProps> = ({
  style,
  products,
  market,
  subcategoryList,
}) => {
  const dispatch = useDispatch()
  const handleAddProductInCart = (item: Product) => {
    dispatch(addToCartRequest(item, market))
  }

  const renderItem = ({ item }: { item: Product }) => (
    <ItemCard
      inColumns
      key={item.id.toString()}
      product={item}
      market={market}
      onPress={() => handleAddProductInCart(item)}
      subcategoryList={subcategoryList}
      style={tailwind('mt-1 ml-1 mb-2 mr-1')}
    />
  )
  const memoizedValue = useMemo(() => renderItem, [products])

  return (
    <FlatList
      data={products}
      maxToRenderPerBatch={30}
      numColumns={2}
      keyExtractor={item => item.id.toString()}
      style={[tailwind('mb-4'), style]}
      showsHorizontalScrollIndicator={false}
      renderItem={memoizedValue}
    />
  )
}

ItemListTwoColumns.displayName = 'ItemListTwoColumns'

export default ItemListTwoColumns
