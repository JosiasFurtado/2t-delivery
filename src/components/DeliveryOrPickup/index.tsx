import { tailwind } from 'lib/styles'
import { IDeliveryOrPickup } from 'pages/Checkout'
import React from 'react'
import { StyleProp, Text, View, ViewStyle } from 'react-native'
import Delivery from './Delivery'
import Days from './Days'
import Hours from './Hours'
import { MarketWithCategories } from 'types/app'

interface DeliveryOrPickupProps {
  readonly style?: StyleProp<ViewStyle>
  readonly deliveryOrPickup: IDeliveryOrPickup | null
  readonly market: MarketWithCategories | undefined
  setDeliveryOrPickup: React.Dispatch<
    React.SetStateAction<IDeliveryOrPickup | null>
  >
}

const DeliveryOrPickup: React.FC<DeliveryOrPickupProps> = ({
  style,
  market,
  deliveryOrPickup,
  setDeliveryOrPickup,
}) => {
  return (
    <View style={style}>
      <Text style={tailwind('text-base px-2')}>Você prefere:</Text>
      <Delivery
        deliveryOrPickup={deliveryOrPickup}
        setDeliveryOrPickup={setDeliveryOrPickup}
      />
      {deliveryOrPickup?.delivery !== undefined && (
        <Days
          style={tailwind('mb-3')}
          market={market}
          deliveryOrPickup={deliveryOrPickup}
          setDeliveryOrPickup={setDeliveryOrPickup}
        />
      )}
      {deliveryOrPickup?.day && (
        <Hours
          market={market}
          deliveryOrPickup={deliveryOrPickup}
          setDeliveryOrPickup={setDeliveryOrPickup}
        />
      )}
    </View>
  )
}

DeliveryOrPickup.displayName = 'DeliveryOrPickup'

export default DeliveryOrPickup
