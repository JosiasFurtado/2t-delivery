import React, { useMemo } from 'react'
import { StyleProp, ViewStyle, FlatList } from 'react-native'
import { tailwind } from 'lib/styles'
import { ItemMock } from 'types/app'
import RequestCard from 'components/RequestCard'

interface RequestListProps {
  readonly style?: StyleProp<ViewStyle>
  readonly data: ItemMock[]
  handleOpenHelpModal(): void
}

const RequestList: React.FC<RequestListProps> = ({
  style,
  data,
  handleOpenHelpModal,
}) => {
  const renderItem = ({ item }: any) => (
    <RequestCard
      key={item.id}
      handleOpenHelpModal={handleOpenHelpModal}
      style={[tailwind('ml-4 mb-4 mr-4'), { height: 135 }]}
    />
  )
  const memoizedValue = useMemo(() => renderItem, [data])
  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      style={[tailwind('-ml-4 mb-24 -mr-4 pt-6'), style]}
      renderItem={memoizedValue}
    />
  )
}
RequestList.displayName = 'RequestList'

export default RequestList
