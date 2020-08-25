import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { tailwind } from 'lib/styles'

const Cart: React.FC = () => {
  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-white')}>
      <View>
        <Text>Cart</Text>
      </View>
    </SafeAreaView>
  )
}

Cart.displayName = 'Cart'

export default Cart
