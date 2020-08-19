import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import tailwind from 'tailwind-rn'

const Cart: React.FC = () => (
  <SafeAreaView style={tailwind('flex-1 relative bg-white')}>
    <View>
      <Text>Cart</Text>
    </View>
  </SafeAreaView>
)

Cart.displayName = 'Cart'

export default Cart
