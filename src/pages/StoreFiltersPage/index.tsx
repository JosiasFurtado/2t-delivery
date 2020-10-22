import React, { useMemo } from 'react'
import {
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import { tailwind } from 'lib/styles'
import Header from 'components/Header'
import { MarketWithCategories } from 'types/app'
import CategoriesList from 'components/List/CategoriesList'
import SubcategoriesList from 'components/List/SubcategoriesList'

interface StoreFiltersPageProps {
  readonly route: {
    params: {
      activeFilter: string,
      market: MarketWithCategories
      activeSubFilter: string,
    }
  }
}

const StoreFiltersPage: React.FC<StoreFiltersPageProps> = ({ route }) => {
  const { activeFilter, market, activeSubFilter } = route.params

  const activeCategory = useMemo(() => market.categories.find(cat => cat.name.includes(activeFilter)), [activeFilter])
  const subcategories = activeCategory?.categories

  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-primary-500')}>
      <ScrollView style={tailwind('bg-gray-50')}>
        <Header storeName={market.name} searchProducts hiddenAddress />
        <View style={tailwind('-mt-4 rounded-t-xl bg-gray-50')}>
          <View style={tailwind('mt-4 px-4 flex-row')}>
            <CategoriesList style={tailwind('px-4 py-2')} market={market} activeFilter={activeFilter} />
          </View>
          <View style={tailwind('px-4 flex-row')}>
            <SubcategoriesList subcategories={subcategories} activeSubFilter={activeSubFilter} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

StoreFiltersPage.displayName = 'StoreFiltersPage'

export default StoreFiltersPage
