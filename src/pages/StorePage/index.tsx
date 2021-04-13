import React, { useState } from 'react'
import {
  StyleProp,
  View,
  ScrollView,
  SafeAreaView,
  ViewStyle,
  Text,
  ActivityIndicator,
} from 'react-native'
import { tailwind } from 'lib/styles'
import Header from 'components/Header'
import ItemList from 'components/List/ItemList'
import StoreModal from 'components/modals/Store/WarnMinimumValues'
import CategoriesList from 'components/List/CategoriesList'
import { Market } from 'types/app'
import useMarketDetails from 'utils/useMarketDetails'
import { useSelector } from 'react-redux'
import { RootState } from 'store/modules/rootReducer'
import Toast from 'components/Toast'

interface StorePageProps {
  readonly style?: StyleProp<ViewStyle>
  readonly route: {
    params: {
      market: Market
    }
  }
}

const StorePage: React.FC<StorePageProps> = ({ route }) => {
  const { error } = useSelector((state: RootState) => state.auth)
  const marketInProps = route.params.market
  const [openModal, setOpenModal] = useState(false)
  const [{ data }] = useMarketDetails(marketInProps.id)

  const existProdutcs = data && data.categories[0] && data.categories[0].categories[0] && data.categories[0].categories[0].products
  return (
    <SafeAreaView style={tailwind('flex-1 bg-primary-500 relative')}>
      <Toast error={error} />
      <ScrollView style={tailwind(`${data ? "bg-gray-50" : "bg-primary-500"}`)}>
        {data ? (
          <>
            <Header store={data} hiddenSearch hiddenAddress />
            <View style={tailwind('-mt-4 h-full rounded-t-xl bg-gray-50 pb-6')}>
              <View style={tailwind('mt-4 px-4 flex-row')}>
                <CategoriesList style={tailwind('px-4 py-2')} market={data} />
              </View>
              {existProdutcs ? (
                <View style={tailwind('px-4')}>
                  <Text style={tailwind('text-lg text-primary-500 mb-2')}>
                    Produtos em destaque
                  </Text>
                  {data.categories.map(category =>
                    category.categories.map(subcategory => (
                      <ItemList
                        key={String(subcategory.id)}
                        products={subcategory.products}
                        categoryName={category.name}
                        title={subcategory.name}
                        market={data}
                        subcategoryList={subcategory.products}
                        style={tailwind('mb-4')}
                      />
                    )),
                  )}
                </View>
              ) : (
                  <View style={tailwind('h-full py-24')}>
                    <Text style={tailwind('px-4 text-center text-lg')}>Esse mercado ainda não possui produtos cadastrados :(</Text>
                  </View>)}
            </View>
          </>
        ) : (
            <View style={tailwind('py-24 items-center justify-center')}>
              <ActivityIndicator color="#fff" size={40} />
            </View>
          )}
      </ScrollView>
      <StoreModal open={openModal} setOpenModal={setOpenModal} />
    </SafeAreaView>
  )
}

StorePage.displayName = 'StorePage'

export default StorePage
