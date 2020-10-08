import { tailwind } from 'lib/styles'
import { IDeliveryOrPickup } from 'pages/Checkout'
import React from 'react'
import { StyleProp, Text, View, ViewStyle } from 'react-native'
import Delivery from './Delivery'
import Days from './Days'
import Hours from './Hours'

interface DeliveryOrPickupProps {
  readonly style?: StyleProp<ViewStyle>
  readonly deliveryOrPickup: IDeliveryOrPickup | null
  setDeliveryOrPickup: React.Dispatch<
    React.SetStateAction<IDeliveryOrPickup | null>
  >
}

const DeliveryOrPickup: React.FC<DeliveryOrPickupProps> = ({
  style,
  deliveryOrPickup,
  setDeliveryOrPickup,
}) => {
  return (
    <View style={style}>
      <Text style={tailwind('text-base')}>Você prefere:</Text>
      <Delivery
        deliveryOrPickup={deliveryOrPickup}
        setDeliveryOrPickup={setDeliveryOrPickup}
      />
      {deliveryOrPickup?.delivery && (
        <Days
          style={tailwind('mb-3')}
          deliveryOrPickup={deliveryOrPickup}
          setDeliveryOrPickup={setDeliveryOrPickup}
        />
      )}
      {deliveryOrPickup?.day && (
        <Hours
          deliveryOrPickup={deliveryOrPickup}
          setDeliveryOrPickup={setDeliveryOrPickup}
        />
      )}
    </View>
  )
}

DeliveryOrPickup.displayName = 'DeliveryOrPickup'

export default DeliveryOrPickup
