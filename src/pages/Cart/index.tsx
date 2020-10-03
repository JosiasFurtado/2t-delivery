import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import { tailwind, getColor } from 'lib/styles'
import logo from '../../../assets/png/logo-without-text.png'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import PrimaryButton from 'components/styledComponents/PrimaryButton'
import ItemCart from 'components/ItemCart'
import CartModal from 'components/modals/Cart'
import { useNavigation } from '@react-navigation/native'
import { CartModals, ProductWithSubtotal } from 'types/app'
import { connect } from 'react-redux'
import { RootState } from 'store/modules/rootReducer'
import formatPrice from 'utils/formatPrice'

interface CartProps {
  readonly cart: ProductWithSubtotal[]
  readonly total: string
}

const Cart: React.FC<CartProps> = ({ total, cart }) => {
  const { navigate } = useNavigation()
  const [typeModal, setTypeModal] = useState<CartModals>('comment')
  const [openModal, setOpenModal] = useState(false)
  const [comment, setComment] = useState<string | undefined>()

  const cartIsEmpty = cart.length === 0
  const tax = 400
  const formatedTax = formatPrice(tax)

  const openCommitModal = (productComment: string) => {
    setComment(productComment)
    setTypeModal('comment')
    setOpenModal(true)
  }
  const openCartClearModal = () => {
    setTypeModal('cleanCart')
    setOpenModal(true)
  }

  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-primary-500')}>

      <View
        style={tailwind('relative bg-primary-500 items-end h-20 px-4 py-2')}
      >
        <Image
          source={logo}
          resizeMode="contain"
          style={tailwind('h-10 w-10')}
        />
      </View>
      <ScrollView style={tailwind('-mt-4 rounded-t-xl bg-white px-4')}>
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
              {cart.map((item: ProductWithSubtotal) => (
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
      </ScrollView>
      <CartModal
        type={typeModal}
        open={openModal}
        comment={comment}
        setComment={setComment}
        setOpenModal={setOpenModal}
      />
    </SafeAreaView>
  )
}

Cart.displayName = 'Cart'

const mapStateToProps = (state: RootState) => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount
    }, 0),
  ),
})
export default connect(mapStateToProps)(Cart)
