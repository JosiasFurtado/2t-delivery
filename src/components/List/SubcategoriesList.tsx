import React, { useMemo } from 'react'
import {
  StyleProp,
  ViewStyle,
  FlatList,
  Text,
  TouchableHighlight,
} from 'react-native'
import { getColor, tailwind } from 'lib/styles'
import { Subcategory } from 'types/app'
import formatString from 'utils/formatString'
import { useNavigation } from '@react-navigation/native'

interface SubcategoriesListProps {
  readonly style?: StyleProp<ViewStyle>
  readonly subcategories: Subcategory[] | undefined
  readonly activeSubFilter?: string
}

const SubcategoriesList: React.FC<SubcategoriesListProps> = ({ style, subcategories, activeSubFilter = "Todos" }) => {
  const { navigate } = useNavigation()

  const subcategoriesArr = subcategories && [{ id: 6155, name: 'Todos' }].concat(subcategories)

  const renderItem = ({ item }: { item: Subcategory }) => {
    const isActive = activeSubFilter === item.name

    return (
      <TouchableHighlight
        underlayColor={getColor('gray-50')}
        onPress={() =>
          navigate('StoreFiltersPage', { activeSubFilter: item.name })
        }
        style={tailwind(`ml-3 mr-1 shadow mb-2 mt-2 p-2 rounded-xl ${isActive ? "bg-primary-500" : "bg-white"}`)}
      >
        <Text style={[tailwind(`text-base text-center ${isActive ? 'text-white font-bold' : 'text-black'}`), { minWidth: 80 }]}>
          {formatString(item.name)}
        </Text>
      </TouchableHighlight>
    )
  }
  const memoizedValue = useMemo(() => renderItem, [subcategoriesArr, activeSubFilter])

  return (
    <FlatList
      data={subcategoriesArr}
      horizontal
      maxToRenderPerBatch={30}
      keyExtractor={item => item.name}
      style={[tailwind('-ml-4 mb-2 -mr-4'), style]}
      showsHorizontalScrollIndicator={false}
      renderItem={memoizedValue}
    />
  )
}
SubcategoriesList.displayName = 'SubcategoriesList'

export default SubcategoriesList
