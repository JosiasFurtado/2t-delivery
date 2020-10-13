import React from 'react'
import { SafeAreaView, View, ScrollView, Text, ActivityIndicator } from 'react-native'
import { getColor, tailwind } from 'lib/styles'
import AdvertisingCarousel from 'components/AdvertisingCarousel'
import Header from 'components/Header'
import StoreList from 'components/List/StoreList'
import StoreCard from 'components/StoreCard'
import useMarkets from 'utils/useMarkets'

const Home: React.FC = () => {
 const [data] = useMarkets()

  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-primary-500')}>
      <Header hiddenBackArrow />
      <ScrollView style={tailwind('-mt-4 rounded-t-xl bg-gray-50')}>
        <View style={tailwind('px-4')}>
          <AdvertisingCarousel style={tailwind('mt-4 mb-2')} />
          {data ? (
            <View>
          <Text style={tailwind('text-lg text-primary-500 mb-2')}>
            Escolha entre os mais novos
          </Text>
          <StoreList data={data} type="vertical" />
          <Text style={tailwind('text-lg text-primary-500 mb-2')}>
            Escolha entre os mais avaliados
          </Text>
          {data?.map(store => (
            <StoreCard key={store.id} market={store} type="horizontal" />
            ))}
            </View>
            ) : 
            <View style={tailwind('items-center justify-center')}>
              <ActivityIndicator color={getColor('primary-500')} size={30} />
              </View>
              }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

Home.displayName = 'Home'

export default Home
