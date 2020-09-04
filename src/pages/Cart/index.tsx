import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import { tailwind, getColor } from 'lib/styles'
import logo from '../../../assets/png/logo-without-text.png'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import PrimaryButton from 'components/styledComponents/PrimaryButton'
import ItemCart from 'components/ItemCart'
import CartModal from 'components/modals/Cart'
import { useNavigation } from '@react-navigation/native'
import { ProductInCart, CartModals } from 'types/app'
import { useSelector } from 'react-redux'
import { RootState } from 'store/modules/rootReducer'
import formatPrice from 'utils/formatPrice'

const productMock: ProductInCart = {
  amount: 1,
  commit: '',
  priceFormatted: 'R$ 11,99',
  id: 'uifisd',
  name: 'Tomates 1kg',
  price: 11.99,
  img: 'https://belezaesaude.com/i/730/56/tomate.jpg',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut orci feugiat, tempor elit vitae, malesuada neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam bibendum sit amet enim id iaculis. Vivamus lacinia odio justo, molestie euismod elit accumsan a. Mauris ultrices sapien at fringilla',
}

const Cart: React.FC = () => {
  const { navigate } = useNavigation()
  const [typeModal, setTypeModal] = useState<CartModals>('comment')
  const cartStore = useSelector((state: RootState) => state.cart)
  const [openModal, setOpenModal] = useState(false)

  const cartIsEmpty = cartStore.length === 0
  const tax = 400
  const formatedTax = formatPrice(tax)
  const total = formatPrice(
    cartStore.reduce((total, product) => {
      return total + tax + product.price * product.amount
    }, 0),
  )

  const openCommitModal = () => {
    setTypeModal('comment')
    setOpenModal(true)
  }
  const openCartClearModal = () => {
    setTypeModal('cartClear')
    setOpenModal(true)
  }

  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-white')}>
      <ScrollView>
        <View
          style={tailwind('relative bg-primary-500 items-end h-20 px-4 py-2')}
        >
          <Image
            source={logo}
            resizeMode="contain"
            style={tailwind('h-10 w-10')}
          />
        </View>
        <View style={tailwind('-mt-4 rounded-t-xl bg-white px-4')}>
          <Text
            style={tailwind('text-lg text-primary-500 mb-2 pt-4 font-bold')}
          >
            {cartIsEmpty ? 'Seu carrinho está vazio' : 'Seu carrinho'}
          </Text>

          {cartIsEmpty ? (
            <Text style={tailwind('text-lg text-gray-700')}>
              Não está precisando de nada?
            </Text>
          ) : (
            <>
              <View style={tailwind('flex-row justify-between mb-4')}>
                <Text style={tailwind('text-lg font-bold')}>Item</Text>
                <Text style={tailwind('text-lg font-bold')}>Subtotal</Text>
              </View>
              {cartStore.map((item: ProductInCart) => (
                <ItemCart
                  key={item.id}
                  product={item}
                  openCommitModal={openCommitModal}
                />
              ))}
              <View style={tailwind('border-b pb-3 border-gray-500 mb-4')}>
                <View style={tailwind('flex-row justify-between mb-1')}>
                  <Text style={tailwind('text-lg font-bold')}>
                    Taxa de entrega
                  </Text>
                  <Text style={tailwind('text-lg font-bold text-primary-500')}>
                    Total
                  </Text>
                </View>
                <View style={tailwind('flex-row justify-between items-end')}>
                  <Text style={tailwind('text-lg')}>+ {formatedTax}</Text>
                  <Text style={tailwind('text-2xl')}>{total}</Text>
                </View>
              </View>
              <View style={tailwind('px-8 pb-4')}>
                <PrimaryButton
                  onPress={openCartClearModal}
                  style={tailwind(
                    'flex-row bg-gray-100 border-2 border-gray-300 mb-4',
                  )}
                >
                  <Text style={tailwind('mr-2 text-lg text-gray-600')}>
                    ESVAZIAR CARRINHO
                  </Text>
                  <FontAwesome5
                    name="trash"
                    size={18}
                    color={getColor('gray-500')}
                  />
                </PrimaryButton>
                <PrimaryButton
                  onPress={() => navigate('Checkout')}
                  style={tailwind('flex-row')}
                >
                  <Text style={tailwind('mr-2 text-lg text-white')}>
                    CONFIRMAR
                  </Text>
                  <Ionicons name="md-checkmark" size={20} color="#fff" />
                </PrimaryButton>
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <CartModal
        type={typeModal}
        open={openModal}
        setOpenModal={setOpenModal}
      />
    </SafeAreaView>
  )
}

Cart.displayName = 'Cart'

export default Cart
