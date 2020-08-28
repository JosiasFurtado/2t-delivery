import React from 'react'
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import { tailwind } from 'lib/styles'
import logo from '../../../assets/png/logo-without-text.png'

const Cart: React.FC = () => {
  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-white')}>
      <ScrollView>
        <View style={tailwind('relative bg-primary-500 h-20 px-4 py-2')}>
          <Image
            source={logo}
            resizeMode="contain"
            style={tailwind('h-10 w-10')}
          />
        </View>
        <View style={tailwind('-mt-4 rounded-t-xl bg-white px-4')}>
          <Text style={tailwind('text-lg text-primary-500 mb-2 pt-4')}>
            Seu carrinho
          </Text>
          <View style={tailwind('flex-row justify-between mb-4')}>
            <Text style={tailwind('text-lg')}>Item</Text>
            <Text style={tailwind('text-lg')}>Subtotal</Text>
          </View>
          <View>
            <View style={tailwind('flex-row')}>
              <Image
                resizeMode="cover"
                style={[
                  tailwind('rounded h-16 w-16'),
                  { borderColor: '#c4c4c4', borderWidth: 1 },
                ]}
                source={{ uri: 'https://belezaesaude.com/i/730/56/tomate.jpg' }}
              />
              <View style={tailwind('ml-2')}>
                <Text style={tailwind('text-base font-bold')}>Tomates 1kg</Text>
                <Text style={tailwind('text-base')}>R$ 11,99</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

Cart.displayName = 'Cart'

export default Cart
