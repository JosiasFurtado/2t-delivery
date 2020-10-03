import React, { useState } from 'react'
import {
  StyleProp,
  View,
  ScrollView,
  SafeAreaView,
  ViewStyle,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native'
import { tailwind } from 'lib/styles'
import Header from 'components/Header'
import ItemList from 'components/List/ItemList'
import StoreModal from 'components/modals/Store/WarnMinimumValues'
import CategoriesList from 'components/List/CategoriesList'

export const productsMock = [
  {
    id: 'uifisd',
    name: 'Tomates 1kg',
    price: 1199,
    img: 'https://belezaesaude.com/i/730/56/tomate.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut orci feugiat, tempor elit vitae, malesuada neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam bibendum sit amet enim id iaculis. Vivamus lacinia odio justo, molestie euismod elit accumsan a. Mauris ultrices sapien at fringilla',
  },
  {
    id: 'uiasdasdfisd',
    name: 'Manga',
    price: 870,
    img:
      'https://s2.glbimg.com/QeQ9cqGo-kE-TyD1crH7jpUiDE4=/620x455/e.glbimg.com/og/ed/f/original/2020/01/21/gettyimages-463651383.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut orci feugiat, tempor elit vitae, malesuada neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam bibendum sit amet enim id iaculis. Vivamus lacinia odio justo, molestie euismod elit accumsan a. Mauris ultrices sapien at fringilla',
  },
  {
    id: 'uifissd',
    name: 'Uva',
    price: 499,
    img:
      'https://alemdovinho.files.wordpress.com/2015/12/uva-tannat.jpg?w=862&h=689',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut orci feugiat, tempor elit vitae, malesuada neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam bibendum sit amet enim id iaculis. Vivamus lacinia odio justo, molestie euismod elit accumsan a. Mauris ultrices sapien at fringilla',
  },
  {
    id: 'uifi22sd',
    name: 'Maça',
    price: 600,
    img:
      'https://media.gazetadopovo.com.br/2019/03/04330279e3c5551ef98b4e48c609d286-gpMedium.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut orci feugiat, tempor elit vitae, malesuada neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam bibendum sit amet enim id iaculis. Vivamus lacinia odio justo, molestie euismod elit accumsan a. Mauris ultrices sapien at fringilla',
  },
  {
    id: 'uifiasdsd',
    name: 'Mamão',
    price: 550,
    img:
      'https://www.sitiodamata.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/s/e/semente-mamao-papaya-hawaii-carica-papaya..jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut orci feugiat, tempor elit vitae, malesuada neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam bibendum sit amet enim id iaculis. Vivamus lacinia odio justo, molestie euismod elit accumsan a. Mauris ultrices sapien at fringilla',
  },
]

interface StorePageProps {
  readonly style?: StyleProp<ViewStyle>
}

const StorePage: React.FC<StorePageProps> = () => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <SafeAreaView style={tailwind('flex-1 bg-primary-500 relative')}>
      <ScrollView style={tailwind('bg-primary-500')}>
        <Header storeName="FreshMarket" searchProducts hiddenAddress />
        <View style={tailwind('-mt-4 rounded-t-xl bg-gray-50 pb-6')}>
          <View style={tailwind('mt-4 px-4 flex-row')}>
            <CategoriesList style={tailwind('px-4 py-2')} />
          </View>
          <View style={tailwind('px-4')}>
            <Text style={tailwind('text-lg text-primary-500 mb-2')}>
              Produtos em destaque
            </Text>
            <ItemList
              products={productsMock}
              title="Frutas e Vegetais"
              style={tailwind('mb-4')}
            />
            <ItemList products={productsMock} title="Alimentos básicos" />
          </View>
        </View>
      </ScrollView>
      <StoreModal open={openModal} setOpenModal={setOpenModal} />
    </SafeAreaView>
  )
}

StorePage.displayName = 'StorePage'

export default StorePage
