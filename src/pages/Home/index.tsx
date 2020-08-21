import React from 'react'
import { SafeAreaView, View, ScrollView, Text, FlatList } from 'react-native'
import { tailwind } from 'lib/styles'
import AdvertisingCarousel from 'components/AdvertisingCarousel'
import Header from 'components/Header'
import StoreCard from 'components/StoreCard'
import ItemCard from 'components/ItemCard'

const storesMock: itemMock[] = [
  { id: 0 },
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
]
type itemMock = {
  id: number
}

const Home: React.FC = () => {
  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-gray-100')}>
      <Header hiddenAddress />
      <ScrollView style={tailwind('-mt-4 rounded-t-xl bg-gray-100')}>
        <View style={tailwind('px-4')}>
          <AdvertisingCarousel style={tailwind('mt-4 mb-2')} />
          <Text style={tailwind('text-lg text-primary-500 mb-2')}>
            Escolha entre os mais novos
          </Text>
          <FlatList
            data={storesMock}
            horizontal
            pagingEnabled
            style={[{ height: 285 }, tailwind('-ml-4 mb-6 -mr-4')]}
            showsHorizontalScrollIndicator={false}
            renderItem={store => (
              <StoreCard
                key={store.item.id}
                type="vertical"
                style={[tailwind('ml-4 mt-1'), { height: 270 }]}
              />
            )}
          />
          <Text style={tailwind('text-lg text-primary-500 mb-2')}>
            Escolha entre os mais avaliados
          </Text>
          <FlatList
            data={storesMock}
            pagingEnabled
            style={[tailwind('-ml-4 mb-2 -mr-4 px-4')]}
            showsHorizontalScrollIndicator={false}
            renderItem={store => (
              <StoreCard key={store.item.id} type="horizontal" />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

Home.displayName = 'Home'

export default Home
