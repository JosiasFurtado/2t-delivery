import React from 'react'
import {
  StyleProp,
  View,
  ViewStyle,
  SafeAreaView,
  Text,
  ScrollView,
} from 'react-native'
import { tailwind } from 'lib/styles'
import Header from 'components/Header'

interface StoreFiltersPageProps {
  readonly style?: StyleProp<ViewStyle>
}

const StoreFiltersPage: React.FC<StoreFiltersPageProps> = () => {
  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-primary-500')}>
      <ScrollView style={tailwind('bg-gray-50')}>
        <Header storeName="FreshMarket" searchProducts hiddenAddress />
        <View style={tailwind('-mt-4 rounded-t-xl bg-gray-50')}>
          <Text style={tailwind('text-white text-2xl')}>StoreFiltersPage</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

StoreFiltersPage.displayName = 'StoreFiltersPage'

export default StoreFiltersPage
