import { tailwind } from 'lib/styles'
import moment from 'moment'
import { IDeliveryOrPickup } from 'pages/Checkout'
import React from 'react'
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

interface DaysProps {
  readonly style?: StyleProp<ViewStyle>
  readonly deliveryOrPickup: IDeliveryOrPickup | null
  setDeliveryOrPickup: React.Dispatch<
    React.SetStateAction<IDeliveryOrPickup | null>
  >
}

const Days: React.FC<DaysProps> = ({
  style,
  deliveryOrPickup,
  setDeliveryOrPickup,
}) => {
  const handleChangeDayOption = (day: string) => {
    setDeliveryOrPickup({
      delivery: true,
      hour: deliveryOrPickup?.hour || null,
      day: day,
    })
  }
  const today = Number(moment().format('D'))
  const dates = [String(today), String(today + 1), String(today + 2)]

  return (
    <View style={[tailwind('flex-row justify-around px-8'), style]}>
      {dates.map((date, index) => (
        <TouchableOpacity
          key={date}
          onPress={() => handleChangeDayOption(date)}
          style={tailwind('items-center')}
        >
          <Text
            style={tailwind(
              `mb-1 text-center ${
                deliveryOrPickup?.day === date
                  ? 'text-primary-500'
                  : 'text-gray-500'
              }`,
            )}
          >
            {index === 0 ? 'Hoje' : index === 1 ? 'Amanhã' : 'Depois'}
          </Text>
          <View
            style={tailwind(
              `w-8 h-8 rounded-full items-center justify-center ${
                deliveryOrPickup?.day === date
                  ? 'bg-primary-500'
                  : 'bg-gray-500'
              }`,
            )}
          >
            <Text style={tailwind('text-white font-bold text-base')}>
              {date}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

Days.displayName = 'Days'

export default Days
