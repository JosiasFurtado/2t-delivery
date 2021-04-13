import React, { useMemo, useState } from 'react'
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
} from 'react-native'
import { getColor, tailwind } from 'lib/styles'
import AdvertisingCarousel from 'components/AdvertisingCarousel'
import Header from 'components/Header'
import StoreList from 'components/List/StoreList'
import StoreCard from 'components/StoreCard'
import useMarkets from 'utils/useMarkets'
import { Market } from 'types/app'

const Home: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string | undefined>()
  const [{ data }] = useMarkets()

  const searchMarkets = useMemo(() => {
    if (searchValue && searchValue !== '') {
      return data?.filter(item =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()),
      )
    }
    return undefined
  }, [searchValue])

  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-primary-500')}>
      <Header
        hiddenBackArrow
        setSearchValue={setSearchValue}
        searchValue={searchValue}
      />
      <ScrollView style={tailwind('-mt-3 rounded-t-xl bg-gray-50')}>
        <View style={tailwind('px-4 py-4')}>
          {searchMarkets ? (
            searchMarkets.map((store: Market) => (
              <StoreCard key={store.id} market={store} type="horizontal" />
            ))
          ) : (
            <>
              <AdvertisingCarousel style={tailwind('mb-2')} />
              {data && data[0] ? (
                <View>
                  <Text style={tailwind('text-lg text-primary-500 mb-2')}>
                    Escolha entre os mais novos
                  </Text>
                  <StoreList data={data} type="vertical" />
                  <Text style={tailwind('text-lg text-primary-500 mb-2')}>
                    Escolha entre os mais avaliados
                  </Text>
                  {data?.map(store => (
                    <StoreCard
                      key={store.id}
                      market={store}
                      type="horizontal"
                    />
                  ))}
                </View>
              ) : data ? (
                <View style={tailwind('items-center justify-center')}>
                  <Text style={tailwind('text-lg text-center text-black')}>
                    Infelizmente ainda não estamos na sua região :(
                  </Text>
                </View>
              ) : (
                <View style={tailwind('items-center justify-center')}>
                  <ActivityIndicator
                    color={getColor('primary-500')}
                    size={30}
                  />
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

Home.displayName = 'Home'

export default Home
