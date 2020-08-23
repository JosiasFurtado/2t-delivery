import React from 'react'
import {
  StyleProp,
  View,
  ViewStyle,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { tailwind, getColor } from 'lib/styles'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import ItemList from 'components/List/ItemList'

interface ItemPageProps {
  readonly style?: StyleProp<ViewStyle>
}
const storesMock = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]

const ItemPage: React.FC<ItemPageProps> = () => {
  const { goBack } = useNavigation()
  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-gray-100')}>
      <ScrollView>
        <View style={tailwind('relative bg-primary-500 h-56')}>
          <Image
            style={tailwind('w-full h-56')}
            resizeMode="cover"
            source={{ uri: 'https://belezaesaude.com/i/730/56/tomate.jpg' }}
          />
          <View style={tailwind('bg-black opacity-25 absolute w-full h-56')} />
          <TouchableOpacity
            onPress={() => goBack()}
            style={tailwind('px-4 absolute py-8')}
          >
            <Ionicons name="md-arrow-back" size={35} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={tailwind('-mt-4 rounded-t-xl bg-gray-100')}>
          <View style={tailwind('px-4 mb-4')}>
            <View
              style={tailwind('mb-4 flex-row justify-between items-start pt-6')}
            >
              <View style={tailwind('w-8/12')}>
                <Text
                  lineBreakMode="tail"
                  numberOfLines={1}
                  style={tailwind('text-primary-500 text-3xl font-medium')}
                >
                  Tomates 1kg
                </Text>
                <Text
                  lineBreakMode="tail"
                  numberOfLines={1}
                  style={tailwind('text-gray-500 text-xl')}
                >
                  Lorem ipsum dolor
                </Text>
              </View>
              <Text style={tailwind('text-2xl font-medium text-primary-500')}>
                R$ 12,99
              </Text>
            </View>
            <Text
              numberOfLines={5}
              lineBreakMode="tail"
              style={tailwind(
                'text-lg mb-8 text-gray-600 leading-6 text-justify',
              )}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut
              orci feugiat, tempor elit vitae, malesuada neque. Orci varius
              natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus. Nam bibendum sit amet enim id iaculis. Vivamus
              lacinia odio justo, molestie euismod elit accumsan a. Mauris
              ultrices sapien at fringilla
            </Text>
          </View>
          <View
            style={tailwind('py-4 px-4 shadow-t rounded-t-xl bg-white pb-16')}
          >
            <Text style={tailwind('text-lg text-primary-500 mb-2')}>
              Produtos relacionados
            </Text>
            <ItemList data={storesMock} />
          </View>
        </View>
      </ScrollView>
      <View style={tailwind('absolute bottom-0 px-4 w-full py-5')}>
        <TouchableHighlight
          underlayColor={getColor('primary-500')}
          style={tailwind('bg-primary-500 py-3 rounded-lg')}
          onPress={() => {}}
        >
          <View style={tailwind('flex-row items-center justify-between px-4')}>
            <Text style={tailwind('text-lg font-medium text-white')}>
              Adicionar ao carrinho
            </Text>
            <View style={tailwind('flex-row relative')}>
              <TouchableOpacity style={tailwind('bg-white px-2 rounded')}>
                <Ionicons
                  name="ios-remove"
                  size={24}
                  color={getColor('primary-500')}
                />
              </TouchableOpacity>
              <Text style={tailwind('text-lg font-medium text-white px-3')}>
                0
              </Text>
              <TouchableOpacity style={tailwind('bg-white px-2 rounded')}>
                <Ionicons
                  name="ios-add"
                  size={24}
                  color={getColor('primary-500')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  )
}

ItemPage.displayName = 'ItemPage'

export default ItemPage
