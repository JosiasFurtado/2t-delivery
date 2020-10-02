import { getColor, tailwind } from 'lib/styles'
import React, { useMemo } from 'react'
import {
  FlatList,
  StyleProp,
  Text,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native'
import { RadioButton } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { RootState } from 'store/modules/rootReducer'
import { Feather } from '@expo/vector-icons';

interface AddressListProps {
  readonly style?: StyleProp<ViewStyle>
}

const AddressList: React.FC<AddressListProps> = ({ style }) => {
  const { address } = useSelector((state: RootState) => state.user)
  const [checked, setChecked] = React.useState('0')

  const renderItem = ({ item }: { item: any }) => (
    <View style={tailwind(`border p-2 rounded-full mb-2 ${String(item.id) === checked ? "border-primary-500" : 'border-gray-500'}`)}>
      <TouchableHighlight
        underlayColor="rgba(0,191,104,0.4)"
        style={tailwind('rounded-full')}
        onPress={() => setChecked(String(item.id))}
        key={String(item.id)}
      >
        <View style={tailwind('flex-row relative items-center')}>
          <View style={tailwind(`w-6 h-6 relative rounded-full mx-2 items-center justify-center border-2 ${String(item.id) === checked ? "border-primary-500" : 'border-gray-500'}`)}>
            <Feather name="check" size={20} color={String(item.id) === checked ? getColor("primary-500") : '#fff'} />
          </View>
          <View>
            <Text style={tailwind('text-base font-bold text-primary-500')}>
              {item.name}
            </Text>
            <Text
              style={tailwind('text-sm w-3/4')}
            >{`${item.street}, ${item.neighborhood}, ${item.number}, ${item.city} - ${item.zipcode}`}</Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  )
  const memoizedValue = useMemo(() => renderItem, [address, checked])

  return (
    <FlatList
      data={address}
      maxToRenderPerBatch={30}
      keyExtractor={item => item.id.toString()}
      showsVerticalScrollIndicator={false}
      style={style}
      renderItem={memoizedValue}
    />
  )
}

AddressList.displayName = 'AddressList'

export default AddressList
