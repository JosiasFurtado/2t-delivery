import React from 'react'
import { SafeAreaView, View, ScrollView, Text } from 'react-native'
import { tailwind } from 'lib/styles'
import AdvertisingCarousel from 'components/AdvertisingCarousel'
import Header from 'components/Header'

const Home: React.FC = () => {
  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-gray-100')}>
      <Header />
      <View style={tailwind('px-4 -mt-4 rounded-t-xl bg-gray-100')}>
        <AdvertisingCarousel style={tailwind('mt-4 mb-2')} />
        <Text style={tailwind('text-base text-primary-500')}>
          Escolha entre os melhores
        </Text>
      </View>
      <ScrollView>
        <View style={tailwind('px-4')} />
      </ScrollView>
    </SafeAreaView>
  )
}

Home.displayName = 'Home'

export default Home
