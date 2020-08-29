import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import { tailwind, getColor } from 'lib/styles'
import logo from '../../../assets/png/logo-without-text.png'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import PrimaryButton from 'components/styledComponents/PrimaryButton'
import ItemCart from 'components/ItemCart'
import CartModal from 'components/modals/Cart'
import { useNavigation } from '@react-navigation/native'

const Cart: React.FC = () => {
  const { navigate } = useNavigation()
  const [openModal, setOpenModal] = useState(false)
  const [quantityMock, setQuantityMock] = useState(1)

  const itemPrice = 11.99
  const itemPriceMultipliedByQuantity = parseFloat(
    (itemPrice * quantityMock).toFixed(2),
  )

  const totalmock = itemPriceMultipliedByQuantity + 4
  const totalmockstring = String(totalmock).replace('.', ',')

  const openCommitModal = () => {
    setOpenModal(true)
  }
  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-white')}>
      <ScrollView>
        <View style={tailwind('relative bg-primary-500 h-20 px-4 py-2')}>
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
            Seu carrinho
          </Text>
          <View style={tailwind('flex-row justify-between mb-4')}>
            <Text style={tailwind('text-lg font-bold')}>Item</Text>
            <Text style={tailwind('text-lg font-bold')}>Subtotal</Text>
          </View>
          <ItemCart
            itemPrice={itemPrice}
            quantityMock={quantityMock}
            setQuantityMock={setQuantityMock}
            openCommitModal={() => openCommitModal()}
          />
          <View style={tailwind('border-b pb-3 border-gray-500 mb-4')}>
            <View style={tailwind('flex-row justify-between mb-1')}>
              <Text style={tailwind('text-lg font-bold')}>Taxa de entrega</Text>
              <Text style={tailwind('text-lg font-bold text-primary-500')}>
                Total
              </Text>
            </View>
            <View style={tailwind('flex-row justify-between items-end')}>
              <Text style={tailwind('text-lg')}>+ R$ 4,00</Text>
              <Text style={tailwind('text-2xl')}>{totalmockstring}</Text>
            </View>
          </View>
        </View>
        <View style={tailwind('px-8 pb-4')}>
          <PrimaryButton
            onPress={() => {}}
            style={tailwind('flex-row bg-gray-100 border-2 border-gray-300')}
          >
            <Text style={tailwind('mr-2 text-lg text-gray-600')}>
              ESVAZIAR CARRINHO
            </Text>
            <FontAwesome5 name="trash" size={18} color={getColor('gray-500')} />
          </PrimaryButton>
        </View>
      </ScrollView>
      <View style={tailwind('px-8 pb-4')}>
        <PrimaryButton
          onPress={() => navigate('Checkout')}
          style={tailwind('flex-row')}
        >
          <Text style={tailwind('mr-2 text-lg text-white')}>CONFIRMAR</Text>
          <Ionicons name="md-checkmark" size={20} color="#fff" />
        </PrimaryButton>
      </View>
      <CartModal open={openModal} setOpenModal={setOpenModal} />
    </SafeAreaView>
  )
}

Cart.displayName = 'Cart'

export default Cart
