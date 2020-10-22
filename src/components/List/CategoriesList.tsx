import React, { useMemo } from 'react'
import {
  StyleProp,
  ViewStyle,
  FlatList,
  Image,
  Text,
  View,
  TouchableHighlight,
} from 'react-native'
import { getColor, tailwind } from 'lib/styles'
import { useNavigation } from '@react-navigation/native'
import { MarketWithCategories } from 'types/app'
import formatString from 'utils/formatString'
import categoryImages from 'utils/categoryImages'

interface CategoriesListProps {
  readonly style?: StyleProp<ViewStyle>
  readonly market: MarketWithCategories
  readonly activeFilter?: string
}

const CategoriesList: React.FC<CategoriesListProps> = ({ style, market, activeFilter }) => {
  const { navigate } = useNavigation()

  const marketCategories = market.categories
    .map(category => category.name)
    .sort()

  const renderItem = ({ item }: { item: string }) => {
    const isActive = activeFilter === item
    return (
      <TouchableHighlight
        underlayColor={getColor('gray-50')}
        onPress={() =>
          navigate('StoreFiltersPage', { activeFilter: item, activeSubFilter: "Todos", market })
        }
        style={tailwind('mr-5')}
      >
        <View>
          <Image
            source={categoryImages.find(cat => item.includes(cat.id))?.image}
            resizeMode="cover"
            style={[tailwind('w-24 h-24 rounded-full mb-1'), isActive ? { borderWidth: 2, borderColor: "#00BF68" } : null]}
          />
          <Text style={tailwind(`text-base text-center w-24 ${isActive ? 'text-primary-500 font-bold' : 'text-black'}`)}>
            {formatString(item)}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
  const memoizedValue = useMemo(() => renderItem, [marketCategories])

  return (
    <FlatList
      data={marketCategories}
      horizontal
      maxToRenderPerBatch={30}
      keyExtractor={item => item}
      style={[tailwind('-ml-4 mb-2 -mr-4'), style]}
      showsHorizontalScrollIndicator={false}
      renderItem={memoizedValue}
    />
  )
}
CategoriesList.displayName = 'CategoriesList'

export default CategoriesList
