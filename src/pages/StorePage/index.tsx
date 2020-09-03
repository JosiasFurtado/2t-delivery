import React, { useState } from 'react'
import {
  StyleProp,
  View,
  ScrollView,
  SafeAreaView,
  ViewStyle,
  Text,
  TouchableOpacity,
} from 'react-native'
import { tailwind } from 'lib/styles'
import Header from 'components/Header'
import TaxWarn from 'components/styledComponents/TaxWarn'
import ItemList from 'components/List/ItemList'
import StoreModal from 'components/modals/Store/WarnMinimumValues'
import { useNavigation } from '@react-navigation/native'

export const productsMock = [
  {
    id: 'uifisd',
    name: 'Tomates 1kg',
    price: 11.99,
    img: 'https://belezaesaude.com/i/730/56/tomate.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut orci feugiat, tempor elit vitae, malesuada neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam bibendum sit amet enim id iaculis. Vivamus lacinia odio justo, molestie euismod elit accumsan a. Mauris ultrices sapien at fringilla',
  },
  {
    id: 'uiasdasdfisd',
    name: 'Tomates 1kg',
    price: 11.99,
    img: 'https://belezaesaude.com/i/730/56/tomate.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut orci feugiat, tempor elit vitae, malesuada neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam bibendum sit amet enim id iaculis. Vivamus lacinia odio justo, molestie euismod elit accumsan a. Mauris ultrices sapien at fringilla',
  },
  {
    id: 'uifissd',
    name: 'Tomates 1kg',
    price: 11.99,
    img: 'https://belezaesaude.com/i/730/56/tomate.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut orci feugiat, tempor elit vitae, malesuada neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam bibendum sit amet enim id iaculis. Vivamus lacinia odio justo, molestie euismod elit accumsan a. Mauris ultrices sapien at fringilla',
  },
  {
    id: 'uifi22sd',
    name: 'Tomates 1kg',
    price: 11.99,
    img: 'https://belezaesaude.com/i/730/56/tomate.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut orci feugiat, tempor elit vitae, malesuada neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam bibendum sit amet enim id iaculis. Vivamus lacinia odio justo, molestie euismod elit accumsan a. Mauris ultrices sapien at fringilla',
  },
  {
    id: 'uifiasdsd',
    name: 'Tomates 1kg',
    price: 11.99,
    img: 'https://belezaesaude.com/i/730/56/tomate.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut orci feugiat, tempor elit vitae, malesuada neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam bibendum sit amet enim id iaculis. Vivamus lacinia odio justo, molestie euismod elit accumsan a. Mauris ultrices sapien at fringilla',
  },
]

interface StorePageProps {
  readonly style?: StyleProp<ViewStyle>
}

const StorePage: React.FC<StorePageProps> = () => {
  const { navigate } = useNavigation()
  const [openModal, setOpenModal] = useState(false)

  return (
    <SafeAreaView style={tailwind('flex-1 bg-gray-50 relative')}>
      <ScrollView>
        <Header searchProducts />
        <View style={tailwind('-mt-4 rounded-t-xl bg-gray-50')}>
          <View style={tailwind('px-4 mt-4')}>
            <TouchableOpacity onPress={() => navigate('StoreDetailsPage')}>
              <Text
                style={tailwind(
                  'text-primary-500 text-3xl mb-3 font-medium w-4/5',
                )}
              >
                FreshMarket
              </Text>
            </TouchableOpacity>
            <TaxWarn setOpenModal={setOpenModal} style={tailwind('mb-6')} />
          </View>
          <View style={tailwind('px-4')}>
            <Text style={tailwind('text-lg text-primary-500 mb-2')}>
              Produtos em destaque
            </Text>
            <ItemList products={productsMock} />
          </View>
        </View>
      </ScrollView>
      <StoreModal open={openModal} setOpenModal={setOpenModal} />
    </SafeAreaView>
  )
}

StorePage.displayName = 'StorePage'

export default StorePage
