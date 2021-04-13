import { tailwind } from 'lib/styles'
import { IDeliveryOrPickup } from 'pages/Checkout'
import React, { useMemo } from 'react'
import {
  FlatList,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { MarketWithCategories, Window } from 'types/app'

interface HoursProps {
  readonly style?: StyleProp<ViewStyle>
  readonly deliveryOrPickup: IDeliveryOrPickup | null
  readonly market: MarketWithCategories | undefined
  setDeliveryOrPickup: React.Dispatch<
    React.SetStateAction<IDeliveryOrPickup | null>
  >
}

const Hours: React.FC<HoursProps> = ({
  style,
  market,
  deliveryOrPickup,
  setDeliveryOrPickup,
}) => {
  const deliveryTimesArr = useMemo(
    () =>
      market?.windows.filter(item => item.weekDay === deliveryOrPickup?.day),
    [deliveryOrPickup?.day],
  )

  const handleChangeHourOption = (hourId: number) => {
    setDeliveryOrPickup({
      delivery:
        deliveryOrPickup?.delivery !== undefined
          ? deliveryOrPickup?.delivery
          : true,
      hour: hourId,
      day: deliveryOrPickup?.day || null,
    })
  }

  const renderItem = ({ item }: { item: Window }) => (
    <TouchableOpacity
      onPress={() => handleChangeHourOption(item.id)}
      style={tailwind(
        `border border-primary-500 px-2 py-3 rounded mr-2 ${
          item.id === deliveryOrPickup?.hour ? 'bg-primary-500' : 'bg-white'
        }`,
      )}
    >
      <Text
        style={tailwind(
          `text-center ${
            item.id === deliveryOrPickup?.hour
              ? 'text-white'
              : 'text-primary-500'
          }`,
        )}
      >
        {item.startsAt.slice(0, 2)} - {item.endsAt}h
      </Text>
    </TouchableOpacity>
  )

  const memoizedValue = useMemo(() => renderItem, [
    deliveryTimesArr,
    deliveryOrPickup,
  ])
  return (
    <View style={[tailwind('items-center'), style]}>
      <FlatList
        data={deliveryTimesArr}
        horizontal
        pagingEnabled
        maxToRenderPerBatch={30}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={memoizedValue}
      />
    </View>
  )
}

Hours.displayName = 'Hours'

export default Hours
