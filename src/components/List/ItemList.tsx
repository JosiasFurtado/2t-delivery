import React, { useMemo } from 'react'
import { StyleProp, ViewStyle, FlatList } from 'react-native'
import { tailwind } from 'lib/styles'
import { ItemMock } from 'types/app'
import ItemCard from 'components/ItemCard'

interface ItemListProps {
  readonly style?: StyleProp<ViewStyle>
  readonly data: ItemMock[]
}

const ItemList: React.FC<ItemListProps> = ({ style, data }) => {
  const renderItem = ({ item }: { item: ItemMock }) => (
    <ItemCard key={item.id} style={[tailwind('ml-4 mt-1'), { height: 270 }]} />
  )
  const memoizedValue = useMemo(() => renderItem, [data])

  return (
    <FlatList
      data={data}
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
