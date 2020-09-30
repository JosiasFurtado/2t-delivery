import React, { useMemo } from 'react'
import {
  StyleProp,
  ViewStyle,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  View,
  TouchableHighlight,
} from 'react-native'
import { getColor, tailwind } from 'lib/styles'
import food from '../../../assets/icons/food.jpg'
import drinks from '../../../assets/icons/drinks.jpg'
import vegetables from '../../../assets/icons/vegetables.jpg'
import bakery from '../../../assets/icons/bakery.jpg'
import candies from '../../../assets/icons/candies.jpg'
import { useNavigation } from '@react-navigation/native'

interface CategoriesListProps {
  readonly style?: StyleProp<ViewStyle>
}

const categoriesMock = [
  { id: 'first', image: food, name: 'Alimentos básicos' },
  { id: 'second', image: drinks, name: 'Bebidas' },
  { id: 'third', image: vegetables, name: 'Frutas e Vegetais' },
  { id: 'fourth', image: candies, name: 'Doces' },
  { id: 'fifth', image: bakery, name: 'Padaria' },
]

const CategoriesList: React.FC<CategoriesListProps> = ({ style }) => {
  const { navigate } = useNavigation()

  const renderItem = ({ item }: any) => (
    <TouchableHighlight
      underlayColor={getColor('gray-200')}
      onPress={() => navigate('StoreFiltersPage', { filterActive: item })}
      style={tailwind('mr-5')}
    >
      <View>
        <Image
          source={item.image}
          resizeMode="cover"
          style={tailwind('w-24 h-24 rounded-full mb-1')}
        />
        <Text style={tailwind('text-base text-center w-24')}>{item.name}</Text>
      </View>
    </TouchableHighlight>
  )
  const memoizedValue = useMemo(() => renderItem, [categoriesMock])

  return (
    <FlatList
      data={categoriesMock}
      horizontal
      pagingEnabled
      maxToRenderPerBatch={30}
      keyExtractor={item => item.id}
      style={[tailwind('-ml-4 mb-2 -mr-4'), style]}
      showsHorizontalScrollIndicator={false}
      renderItem={memoizedValue}
    />
  )
}
CategoriesList.displayName = 'CategoriesList'

export default CategoriesList
