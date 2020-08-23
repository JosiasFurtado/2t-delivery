import React, { useMemo } from 'react'
import { StyleProp, ViewStyle, FlatList } from 'react-native'
import { tailwind } from 'lib/styles'
import StoreCard from 'components/StoreCard'
import { ItemMock } from 'types/app'

interface StoreListProps {
  readonly style?: StyleProp<ViewStyle>
  readonly data: ItemMock[]
  readonly type: 'vertical' | 'horizontal'
}

const StoreList: React.FC<StoreListProps> = ({ style, data, type }) => {
  const renderItem = ({ item }: any) => (
    <StoreCard
      key={item.id}
      type={type}
      style={
        type === 'vertical' ? [tailwind('ml-4 mt-1'), { height: 270 }] : null
      }
    />
  )
  const memoizedValue = useMemo(() => renderItem, [data])
  return (
    <FlatList
      data={data}
      horizontal={type === 'vertical' ? true : false}
      pagingEnabled
      style={[
        type === 'vertical' ? { height: 285 } : null,
        tailwind('-ml-4 mb-6 -mr-4'),
        style,
      ]}
      showsHorizontalScrollIndicator={false}
      renderItem={memoizedValue}
    />
  )
}
StoreList.displayName = 'StoreList'

export default StoreList
