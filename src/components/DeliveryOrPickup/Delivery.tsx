import { Feather } from '@expo/vector-icons'
import { getColor, tailwind } from 'lib/styles'
import { IDeliveryOrPickup } from 'pages/Checkout'
import React from 'react'
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

interface DeliveryProps {
  readonly style?: StyleProp<ViewStyle>
  readonly deliveryOrPickup: IDeliveryOrPickup | null
  setDeliveryOrPickup: React.Dispatch<
    React.SetStateAction<IDeliveryOrPickup | null>
  >
}

const Delivery: React.FC<DeliveryProps> = ({
  style,
  deliveryOrPickup,
  setDeliveryOrPickup,
}) => {
  const handleChangeDeliveryOption = (isDelivery: boolean) => {
    setDeliveryOrPickup({
      delivery: isDelivery,
      hour: null,
      day: null,
    })
  }
  return (
    <View style={[tailwind('py-2 flex-row justify-center mb-2'), style]}>
      <TouchableOpacity
        onPress={() => handleChangeDeliveryOption(true)}
        style={tailwind('flex-row items-center')}
      >
        <View
          style={tailwind(
            `w-6 h-6 relative rounded-full mx-2 items-center justify-center border-2 ${
              deliveryOrPickup?.delivery
                ? 'border-primary-500'
                : 'border-gray-500'
            }`,
          )}
        >
          <Feather
            name="check"
            size={20}
            color={
              deliveryOrPickup?.delivery ? getColor('primary-500') : '#fff'
            }
          />
        </View>
        <Text
          style={tailwind(
            `text-lg ${
              deliveryOrPickup?.delivery ? 'text-primary-500' : 'text-gray-500'
            }`,
          )}
        >
          Receber
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleChangeDeliveryOption(false)}
        style={tailwind('flex-row items-center ml-3')}
      >
        <View
          style={tailwind(
            `w-6 h-6 relative rounded-full mx-2 items-center justify-center border-2 ${
              deliveryOrPickup?.delivery === false
                ? 'border-primary-500'
                : 'border-gray-500'
            }`,
          )}
        >
          <Feather
            name="check"
            size={20}
            color={
              deliveryOrPickup?.delivery === false
                ? getColor('primary-500')
                : '#fff'
            }
          />
        </View>
        <Text
          style={tailwind(
            `text-lg ${
              deliveryOrPickup?.delivery === false
                ? 'text-primary-500'
                : 'text-gray-500'
            }`,
          )}
        >
          Retirar
        </Text>
      </TouchableOpacity>
    </View>
  )
}

Delivery.displayName = 'Delivery'

export default Delivery
