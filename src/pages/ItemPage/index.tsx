import React, { useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
} from 'react-native'
import { tailwind, getColor } from 'lib/styles'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import ItemList from 'components/List/ItemList'
import AddItemToCart from 'components/FooterAddItemToCart'
import { TextInput } from 'react-native-gesture-handler'
import { Market, Product } from 'types/app'
import formatPrice from 'utils/formatPrice'

interface ItemPageProps {
  route: {
    params: {
      product: Product
      market: Market
      subcategoryList: Product[]
    }
  }
}

const ItemPage: React.FC<ItemPageProps> = ({ route }) => {
  const { product, market, subcategoryList } = route.params
  const { goBack } = useNavigation()
  const [openCommentArea, setOpenCommentArea] = useState(false)
  const [commentValue, setCommentValue] = useState<string | undefined>()

  const itemPriceWithComma = formatPrice(product.price)

  const productsOfTheSameCategory = subcategoryList.filter(item => item.id !== product.id)

  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-primary-500')}>
      <ScrollView style={tailwind('bg-gray-50')}>
        <View style={tailwind('relative bg-primary-500 h-56')}>
          <Image
            style={tailwind('w-full h-56')}
            resizeMode="cover"
            source={{ uri: product.imageUrl }}
          />
          <View style={tailwind('bg-black opacity-25 absolute w-full h-56')} />
          <TouchableOpacity
            onPress={() => goBack()}
            style={tailwind('px-4 absolute py-8')}
          >
            <Ionicons name="md-arrow-back" size={35} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={tailwind('-mt-4 rounded-t-xl bg-gray-50')}>
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
                  {product.name}
                </Text>
                <Text
                  lineBreakMode="tail"
                  numberOfLines={1}
                  style={tailwind('text-gray-500 text-xl')}
                >
                  {market.name}
                </Text>
              </View>
              <Text style={tailwind('text-2xl font-medium text-primary-500')}>
                {itemPriceWithComma}
              </Text>
            </View>
            <Text
              numberOfLines={5}
              lineBreakMode="tail"
              style={tailwind(
                'text-lg mb-8 text-gray-600 leading-6 text-justify',
              )}
            >
              {product.description}
            </Text>
            <TouchableHighlight
              underlayColor="#fff"
              style={tailwind(`${openCommentArea ? '' : 'mb-4'}`)}
              onPress={() => setOpenCommentArea(!openCommentArea)}
            >
              <View
                style={tailwind(
                  `flex-row bg-primary-500 items-center px-2 py-1 ${openCommentArea ? 'rounded-t-lg' : 'rounded-lg'
                  }`,
                )}
              >
                <Ionicons name="ios-add" size={26} color="#fff" />
                <Text style={tailwind('text-white ml-2 text-lg')}>
                  Adicionar observação
                </Text>
              </View>
            </TouchableHighlight>
            {openCommentArea && (
              <TextInput
                placeholder="Caso precise, adicione aqui uma observação. Exemplo: Quero bananas mais verdes"
                allowFontScaling={false}
                multiline={true}
                numberOfLines={3}
                autoCorrect={false}
                autoCapitalize="none"
                value={commentValue}
                onChangeText={text => setCommentValue(text)}
                placeholderTextColor={getColor('gray-600')}
                style={tailwind(
                  'bg-gray-200 rounded-b-lg px-4 py-2 mb-4 text-lg',
                )}
              />
            )}
          </View>
          <View
            style={tailwind('py-4 px-4 shadow-t rounded-t-xl bg-white pb-8')}
          >
            <Text style={tailwind('text-lg text-primary-500 mb-2')}>
              Produtos relacionados
            </Text>
            <ItemList products={productsOfTheSameCategory} market={market} subcategoryList={productsOfTheSameCategory} />
          </View>
        </View>
      </ScrollView>
      <AddItemToCart product={product} comment={commentValue} />
    </SafeAreaView>
  )
}

ItemPage.displayName = 'ItemPage'

export default ItemPage
