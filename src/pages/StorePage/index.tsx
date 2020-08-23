import React from 'react'
import {
  StyleProp,
  View,
  ScrollView,
  SafeAreaView,
  ViewStyle,
  Text,
  FlatList,
} from 'react-native'
import { tailwind } from 'lib/styles'
import Header from 'components/Header'
import TaxWarn from 'components/styledComponents/TaxWarn'
import ItemCard from 'components/ItemCard'

interface StorePageProps {
  readonly style?: StyleProp<ViewStyle>
}

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

const StorePage: React.FC<StorePageProps> = () => {
  return (
    <SafeAreaView style={tailwind('flex-1 bg-gray-100 relative')}>
      <ScrollView>
        <Header searchProducts />
        <View style={tailwind('-mt-4 rounded-t-xl bg-gray-100')}>
          <View style={tailwind('px-4 mt-4')}>
            <Text
              style={tailwind(
                'text-primary-500 text-3xl mb-3 font-medium w-4/5',
              )}
            >
              FreshMarket
            </Text>
            <TaxWarn style={tailwind('mb-6')} />
          </View>
          <View style={tailwind('px-4')}>
            <Text style={tailwind('text-lg text-primary-500 mb-2')}>
              Produtos em destaque
            </Text>
            <FlatList
              data={storesMock}
              horizontal
              pagingEnabled
              style={[{ height: 280 }, tailwind('-ml-4 mb-2 -mr-4')]}
              showsHorizontalScrollIndicator={false}
              renderItem={item => (
                <ItemCard
                  key={item.item.id}
                  style={[tailwind('ml-4 mt-1'), { height: 270 }]}
                />
              )}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

StorePage.displayName = 'StorePage'

export default StorePage
