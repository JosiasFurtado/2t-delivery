import React, { useMemo, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import { tailwind, getColor } from 'lib/styles'
import logo from '../../../assets/png/logo-without-text.png'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import PrimaryButton from 'components/styledComponents/PrimaryButton'
import ItemCart from 'components/ItemCart'
import CartModal from 'components/modals/Cart'
import { useNavigation } from '@react-navigation/native'
import { CartModals, ProductWithSubtotal } from 'types/app'
import { connect, useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/modules/rootReducer'
import formatPrice from 'utils/formatPrice'
import useMarketDetails from 'utils/useMarketDetails'
import { signOut } from 'store/modules/auth/actions'

interface CartProps {
  readonly cart: ProductWithSubtotal[]
  readonly total: string
}

const Cart: React.FC<CartProps> = ({ total, cart }) => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.user)
  const [typeModal, setTypeModal] = useState<CartModals>('comment')
  const [openModal, setOpenModal] = useState(false)
  const [comment, setComment] = useState<{
    comment: string | undefined
    productId: number | undefined
  }>()
  const [{ data }] = useMarketDetails(cart[0] && cart[0].marketId)

  const tax = useMemo(() => {
    if (
      data &&
      data.deliveryRanges[0] &&
      data.distanceBetweenUser <= data.deliveryRanges[0].endsAt
    ) {
      return data.deliveryRanges[0].price
    }
    if (
      data &&
      data.deliveryRanges[1] &&
      data.distanceBetweenUser <= data.deliveryRanges[1].endsAt
    ) {
      return data.deliveryRanges[1].price
    }
    if (
      data &&
      data.deliveryRanges[2] &&
      data.distanceBetweenUser <= data.deliveryRanges[2].endsAt
    ) {
      return data.deliveryRanges[2].price
    }
    if (
      data &&
      data.deliveryRanges[3] &&
      data.distanceBetweenUser <= data.deliveryRanges[3].endsAt
    ) {
      return data.deliveryRanges[3].price
    }
    if (
      data &&
      data.deliveryRanges[4] &&
      data.distanceBetweenUser <= data.deliveryRanges[4].endsAt
    ) {
      return data.deliveryRanges[4].price
    }
    return '10.00'
  }, [data, data?.distanceBetweenUser])

  const cartIsEmpty = cart.length === 0
  const totalWithTax = formatPrice(String(Number(total) + Number(tax)))
  const totalSubMinimal = data && Number(total) - Number(data.minimalPrice)
  const pricePositive = totalSubMinimal && Math.abs(totalSubMinimal)
  const itRemainsToReachMinimal =
    totalSubMinimal && totalSubMinimal > 0
      ? true
      : `Faltam ${formatPrice(String(pricePositive))}`

  const productsToCheckout = cart.map(item => {
    const obj = {
      productId: item.id,
      amount: item.amount,
      comment: item.commit || '',
    }
    return obj
  })

  const openCommitModal = (productComment: string, productId: number) => {
    setComment({ comment: productComment, productId })
    setTypeModal('comment')
    setOpenModal(true)
  }
  const openCartClearModal = () => {
    setTypeModal('cleanCart')
    setOpenModal(true)
  }

  const handleNavigateCheckout = () => {
    if (user?.firstName === 'Visitante') {
      dispatch(signOut())
      return navigate('Login', { fromVisitor: true })
    }
    if (itRemainsToReachMinimal === true) {
      return navigate('Checkout', {
        total: totalWithTax,
        market: data,
        items: productsToCheckout,
      })
    }
    return null
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
        <Text style={tailwind('text-lg text-primary-500 mb-2 pt-4 font-bold')}>
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
                <Text style={tailwind('text-lg')}>+ {formatPrice(tax)}</Text>
                <Text style={tailwind('text-2xl')}>{totalWithTax}</Text>
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
                onPress={handleNavigateCheckout}
                style={tailwind(
                  `flex-row ${
                    itRemainsToReachMinimal !== true ? 'bg-red-500' : ''
                  }`,
                )}
              >
                {itRemainsToReachMinimal === true ? (
                  user?.firstName === 'Visitante' ? (
                    <Text style={tailwind('mr-2 text-lg text-white')}>
                      É NECESSARIO SE CADASTRAR
                    </Text>
                  ) : (
                    <>
                      <Text style={tailwind('mr-2 text-lg text-white')}>
                        CONTINUAR
                      </Text>
                      <Ionicons name="md-checkmark" size={20} color="#fff" />
                    </>
                  )
                ) : (
                  <Text style={tailwind('mr-2 text-lg text-white')}>
                    {itRemainsToReachMinimal}
                  </Text>
                )}
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
    subtotal: formatPrice(
      String(
        Number(
          product.promotionPrice ? product.promotionPrice : product.price,
        ) * product.amount,
      ),
    ),
  })),
  total: String(
    state.cart.reduce((total, product) => {
      return (
        total +
        Number(
          product.promotionPrice ? product.promotionPrice : product.price,
        ) *
          product.amount
      )
    }, 0),
  ),
})
export default connect(mapStateToProps)(Cart)
