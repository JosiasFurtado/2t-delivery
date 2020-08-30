import React from 'react'
import { Text, View, SafeAreaView } from 'react-native'
import { tailwind } from 'lib/styles'

const Checkout: React.FC = () => {
  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-white')}>
      <View>
        <Text>Checkout</Text>
      </View>
    </SafeAreaView>
  )
}
Checkout.displayName = 'Checkout'

export default Checkout
