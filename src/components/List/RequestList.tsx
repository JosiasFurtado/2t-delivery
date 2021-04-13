import React, { Dispatch, SetStateAction, useMemo } from 'react'
import { StyleProp, ViewStyle, FlatList } from 'react-native'
import { tailwind } from 'lib/styles'
import { Order } from 'types/app'
import RequestCard from 'components/RequestCard'

interface RequestListProps {
  readonly style?: StyleProp<ViewStyle>
  readonly data: Order[]
  readonly refetch: boolean
  handleOpenHelpModal(orderHelp: Order): void
  setRefetch: Dispatch<SetStateAction<boolean>>
}

const RequestList: React.FC<RequestListProps> = ({
  style,
  data,
  refetch,
  setRefetch,
  handleOpenHelpModal,
}) => {
  const handleRefresh = () => {
    setRefetch(true)
    setTimeout(() => {
      setRefetch(false)
    }, 2000);
  }

  const renderItem = ({ item }: { item: Order }) => (
    <RequestCard
      key={item.id}
      order={item}
      handleOpenHelpModal={handleOpenHelpModal}
      style={[tailwind('ml-4 mb-4 mr-4'), { height: 135 }]}
    />
  )
  const memoizedValue = useMemo(() => renderItem, [data])

  return (
    <FlatList
      data={data}
      maxToRenderPerBatch={30}
      keyExtractor={item => item.id.toString()}
      showsVerticalScrollIndicator={false}
      onRefresh={() => handleRefresh()}
      refreshing={refetch}
      style={[tailwind('-ml-4 -mr-4 pt-4'), style]}
      renderItem={memoizedValue}
    />
  )
}
RequestList.displayName = 'RequestList'

export default RequestList
