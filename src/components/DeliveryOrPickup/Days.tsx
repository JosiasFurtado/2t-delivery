import { tailwind } from 'lib/styles'
import { IDeliveryOrPickup } from 'pages/Checkout'
import React, { useMemo } from 'react'
import {
  ScrollView,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { MarketWithCategories } from 'types/app'
import translateWeekDay from 'utils/translateWeekDay'

interface DaysProps {
  readonly style?: StyleProp<ViewStyle>
  readonly deliveryOrPickup: IDeliveryOrPickup | null
  readonly market: MarketWithCategories | undefined
  setDeliveryOrPickup: React.Dispatch<
    React.SetStateAction<IDeliveryOrPickup | null>
  >
}

const Days: React.FC<DaysProps> = ({
  style,
  market,
  deliveryOrPickup,
  setDeliveryOrPickup,
}) => {
  const handleChangeDayOption = (day: string) => {
    setDeliveryOrPickup({
      delivery:
        deliveryOrPickup?.delivery !== undefined
          ? deliveryOrPickup?.delivery
          : true,
      hour: deliveryOrPickup?.hour || null,
      day,
    })
  }

  const dates = useMemo(() => {
    let dat: any = []
    market?.windows.map(window => {
      const alreadyInArr = dat.find((item: string) => item === window.weekDay)
      if (!alreadyInArr) {
        return dat.push(window.weekDay)
      }
      return dat
    })
    return dat
  }, [market])

  return (
    <ScrollView
      bounces={false}
      showsHorizontalScrollIndicator={false}
      horizontal
      style={[tailwind('flex-row'), style]}
    >
      {dates?.map((date: string) => (
        <TouchableOpacity
          key={date}
          onPress={() => handleChangeDayOption(date)}
          style={tailwind('items-center mr-2')}
        >
          <View
            style={tailwind(
              `rounded items-center px-2 py-1 ${
                deliveryOrPickup?.day === date
                  ? 'bg-primary-500'
                  : 'bg-gray-500'
              }`,
            )}
          >
            <Text style={tailwind('text-white font-bold text-base')}>
              {translateWeekDay(date)}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

Days.displayName = 'Days'

export default Days
