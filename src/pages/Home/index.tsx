import React from 'react'
import { SafeAreaView, View, ScrollView, Text } from 'react-native'
import { tailwind } from 'lib/styles'
import AdvertisingCarousel from 'components/AdvertisingCarousel'
import Header from 'components/Header'
import { ItemMock } from 'types/app'
import StoreList from 'components/List/StoreList'
import StoreCard from 'components/StoreCard'

export const storesMock: ItemMock[] = [
  { id: '0' },
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
]

const Home: React.FC = () => {
  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-gray-50')}>
      <Header hiddenAddress />
      <ScrollView style={tailwind('-mt-4 rounded-t-xl bg-gray-50')}>
        <View style={tailwind('px-4')}>
          <AdvertisingCarousel style={tailwind('mt-4 mb-2')} />
          <Text style={tailwind('text-lg text-primary-500 mb-2')}>
            Escolha entre os mais novos
          </Text>
          <StoreList data={storesMock} type="vertical" />
          <Text style={tailwind('text-lg text-primary-500 mb-2')}>
            Escolha entre os mais avaliados
          </Text>
          {storesMock.map(store => (
            <StoreCard key={store.id} type="horizontal" />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

Home.displayName = 'Home'

export default Home
