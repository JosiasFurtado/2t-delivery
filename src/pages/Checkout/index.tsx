import React, { useState } from 'react'
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { tailwind } from 'lib/styles'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import DeliveryOrPickup from 'components/DeliveryOrPickup'

export interface IDeliveryOrPickup {
  delivery: boolean | null
  day: string | null
  hour: number | null
}
const Checkout: React.FC = () => {
  const { goBack } = useNavigation()
  const [
    deliveryOrPickup,
    setDeliveryOrPickup,
  ] = useState<IDeliveryOrPickup | null>(null)

  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-primary-500')}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={tailwind(
            'bg-primary-500 flex-row -mt-4 h-32 px-4 items-center justify-between',
          )}
        >
          <View style={tailwind('flex-row items-center')}>
            <TouchableOpacity onPress={() => goBack()} style={tailwind('py-2')}>
              <Ionicons name="md-arrow-back" size={35} color="#fff" />
            </TouchableOpacity>
            <Text style={tailwind('text-white text-2xl ml-4')}>Checkout</Text>
            <View />
          </View>
        </View>
        <View style={tailwind('-mt-4 rounded-t-xl bg-white px-4 pt-4')}>
          <DeliveryOrPickup
            style={tailwind('mb-4')}
            deliveryOrPickup={deliveryOrPickup}
            setDeliveryOrPickup={setDeliveryOrPickup}
          />
          <View>
            <Text>Endereço</Text>
          </View>
          <TouchableOpacity
            style={tailwind(
              'mb-4 flex-row items-center justify-center bg-primary-500 items-center rounded py-3',
            )}
          >
            <Text style={tailwind('text-base text-white uppercase mr-3')}>
              Finalizar pedido
            </Text>
            <Ionicons name="md-checkmark" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
Checkout.displayName = 'Checkout'

export default Checkout
