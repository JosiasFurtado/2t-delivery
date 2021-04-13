import React, { useMemo, useState } from 'react'
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native'
import { tailwind } from 'lib/styles'
import Header from 'components/Header'
import { MarketWithCategories, Product } from 'types/app'
import CategoriesList from 'components/List/CategoriesList'
import SubcategoriesList from 'components/List/SubcategoriesList'
import ItemListTwoColumns from 'components/List/ItemListTwoColumns'
import Toast from 'components/Toast'
import { RootState } from 'store/modules/rootReducer'
import { useSelector } from 'react-redux'

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
  const { error } = useSelector((state: RootState) => state.auth)
  const [searchValue, setSearchValue] = useState<string | undefined>()
  const { activeFilter, market, activeSubFilter } = route.params
  const activeCategory = useMemo(() => market.categories.find(cat => cat.name.includes(activeFilter)), [activeFilter])

  const products = useMemo(() => {
    if (activeSubFilter === 'Todos') {
      let allProducts: Product[] = []
      activeCategory?.categories.map(sub => {
        return sub.products.map(prod => allProducts.push(prod))
      })
      return allProducts
    }
    const arr = activeCategory?.categories.filter(sub => sub.name === activeSubFilter)
    return arr && arr[0].products
  }, [activeSubFilter, activeFilter])

  const searchProducts = useMemo(() => {
    let allProducts: Product[] = []
    if (searchValue && searchValue !== '') {
      market.categories.map(cat => {
        cat.categories.map(sub => sub.products.map(prod => allProducts.push(prod)))
        return null
      })
      const filteredProds = allProducts.filter(prod => prod.name.toLowerCase().includes(searchValue?.toLowerCase()))
      return filteredProds
    }
    return undefined
  }, [searchValue])

  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-primary-500')}>
      <Toast error={error} />
      <ScrollView style={tailwind('bg-gray-50')}>
        <Header store={market} searchProducts hiddenAddress setSearchValue={setSearchValue} searchValue={searchValue} />
        <View style={tailwind('-mt-4 rounded-t-xl bg-gray-50')}>
          {searchProducts && searchProducts[0] ? (
            <View style={tailwind('mt-8 px-2')}>
              <Text style={tailwind('mb-2 text-lg text-primary-500')}>Resultados da sua busca:</Text>
              <ItemListTwoColumns market={market} products={searchProducts} subcategoryList={searchProducts} />
            </View>
          ) : searchProducts ? (
            <View style={tailwind('mt-8 px-2')}>
              <Text style={tailwind('mb-2 text-xl text-primary-500 text-center')}>Não encontramos nada :(</Text>
              <Text style={tailwind('mb-2 text-base text-gray-700 text-center')}>Tente navegador pelas categorias</Text>
            </View>
          ) : (
                <>
                  <View style={tailwind('mt-4 px-4 flex-row')}>
                    <CategoriesList style={tailwind('px-4 py-2')} market={market} activeFilter={activeFilter} />
                  </View>
                  <View style={tailwind('px-4 flex-row')}>
                    <SubcategoriesList subcategories={activeCategory?.categories} activeSubFilter={activeSubFilter} />
                  </View>
                  <View style={tailwind('px-2')}>
                    {products ? (
                      <ItemListTwoColumns market={market} products={products} subcategoryList={products} />
                    )
                      : <Text>Nenhum produto encontrado</Text>}
                  </View>
                </>
              )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

StoreFiltersPage.displayName = 'StoreFiltersPage'

export default StoreFiltersPage
