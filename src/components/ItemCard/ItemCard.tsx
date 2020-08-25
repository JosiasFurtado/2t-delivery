import React from 'react'
import {
  StyleProp,
  View,
  ViewStyle,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  TouchableHighlightBase,
} from 'react-native'
import { tailwind } from 'lib/styles'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'

interface ItemCardProps {
  readonly style?: StyleProp<ViewStyle>
}

const ItemCard: React.FC<ItemCardProps> = ({ style }) => {
  const { navigate } = useNavigation()

  return (
    <View
      style={[
        style,
        tailwind('bg-white shadow-md rounded-lg w-48 px-2 py-2'),
        { borderColor: '#edf2f7', borderWidth: 1 },
      ]}
    >
      <TouchableHighlight
        underlayColor="#fff"
        onPress={() => navigate('ItemPage')}
      >
        <View>
          <Image
            style={[
              tailwind('w-full h-32 rounded-lg mb-1'),
              { borderColor: '#edf2f7', borderWidth: 2 },
            ]}
            resizeMode="cover"
            source={{
              uri: 'https://belezaesaude.com/i/730/56/tomate.jpg',
            }}
          />
          <View style={tailwind('flex-row items-center justify-between')}>
            <Text
              numberOfLines={1}
              lineBreakMode="tail"
              style={tailwind('text-sm font-bold mb-1 w-1/2')}
            >
              Tomates 1kg
            </Text>
            <Text style={tailwind('text-base font-bold text-primary-500')}>
              R$ 12,99
            </Text>
          </View>
          <Text
            numberOfLines={3}
            lineBreakMode="tail"
            style={tailwind('text-base mb-2 text-gray-600 text-justify')}
          >
            1Kg de tomates selecionados com variados tamanhos
          </Text>
        </View>
      </TouchableHighlight>
      <TouchableOpacity style={tailwind('bg-primary-500 py-1 rounded')}>
        <View style={tailwind('flex-row items-center justify-center')}>
          <MaterialIcons name="add-shopping-cart" size={16} color="#fff" />
          <Text style={tailwind('text-white text-lg ml-1')}>Adicionar</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

ItemCard.displayName = 'ItemCard'

export default ItemCard
