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
  FlatList,
} from 'react-native'
import { tailwind } from 'lib/styles'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import ItemCard from 'components/ItemCard'

interface ItemPageProps {
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

const ItemPage: React.FC<ItemPageProps> = () => {
  const { goBack } = useNavigation()
  return (
    <SafeAreaView style={tailwind('flex-1 bg-gray-100')}>
      <View style={tailwind('relative bg-primary-500 h-48')}>
        <Image
          style={tailwind('w-full h-48')}
          resizeMode="cover"
          source={{ uri: 'https://belezaesaude.com/i/730/56/tomate.jpg' }}
        />
        <View style={tailwind('bg-black opacity-25 absolute w-full h-48')} />
        <TouchableOpacity
          onPress={() => goBack()}
          style={tailwind('px-4 absolute py-8')}
        >
          <Ionicons name="md-arrow-back" size={35} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView style={tailwind('-mt-4 rounded-t-xl bg-gray-100')}>
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
                Tomates 1kg asdasdsa asdsad
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
              'text-lg mb-12 text-gray-600 leading-6 text-justify',
            )}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut
            orci feugiat, tempor elit vitae, malesuada neque. Orci varius
            natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Nam bibendum sit amet enim id iaculis. Vivamus
            lacinia odio justo, molestie euismod elit accumsan a. Mauris
            ultrices sapien at fringilla
          </Text>
          <TouchableHighlight
            underlayColor="#019853"
            style={tailwind('bg-primary-500 py-3 rounded-lg mb-2')}
            onPress={() => {}}
          >
            <View
              style={tailwind('flex-row items-center justify-between px-4')}
            >
              <Text style={tailwind('text-lg font-medium text-white')}>
                Adicionar ao carrinho
              </Text>
              <View style={tailwind('flex-row relative')}>
                <TouchableOpacity style={tailwind('bg-white px-2 rounded')}>
                  <Ionicons name="ios-remove" size={24} color="#019853" />
                </TouchableOpacity>
                <Text style={tailwind('text-lg font-medium text-white px-3')}>
                  0
                </Text>
                <TouchableOpacity style={tailwind('bg-white px-2 rounded')}>
                  <Ionicons name="ios-add" size={24} color="#019853" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableHighlight>
        </View>
        <View style={tailwind('py-4 px-4 shadow-t rounded-xl bg-gray-100')}>
          <Text style={tailwind('text-lg text-primary-500 mb-2')}>
            Produtos relacionados
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
      </ScrollView>
    </SafeAreaView>
  )
}

ItemPage.displayName = 'ItemPage'

export default ItemPage
