import React, { useRef, useState } from 'react'
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { getColor, tailwind } from 'lib/styles'
import { Ionicons, Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import DeliveryOrPickup from 'components/DeliveryOrPickup'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/modules/rootReducer'
import CheckoutForm from 'components/Form/CheckoutForm'
import { FormHandles } from '@unform/core'
import {
  CheckoutModals,
  MarketWithCategories,
  PaymentSelected,
} from 'types/app'
import CheckoutModal from 'components/modals/Checkout'
import { checkoutSchema } from 'utils/schemas'
import api from 'services/api'
import Toast from 'components/Toast'
import { requestError } from 'store/modules/auth/actions'
import { AxiosError, AxiosResponse } from 'axios'
import { removeAllFromCart } from 'store/modules/cart/actions'

export interface IDeliveryOrPickup {
  delivery: boolean | null
  day: string | null
  hour: number | null
}

interface CheckoutProps {
  readonly route: {
    params: {
      total: string
      market: MarketWithCategories | undefined
      items: {
        productId: number
        amount: number
      }[]
    }
  }
}

const Checkout: React.FC<CheckoutProps> = ({ route }) => {
  const dispatch = useDispatch()
  const { navigate, goBack } = useNavigation()
  const { total, market, items } = route.params
  const [paymentMethod, setPaymentMethod] = useState<
    PaymentSelected | undefined
  >()
  const [openModal, setOpenModal] = useState(false)
  const [typeModal, setTypeModal] = useState<CheckoutModals>('address')
  const [checkoutForm, setCheckoutForm] = useState<{
    phone: string | undefined
    cpf: string | undefined
  }>({ phone: undefined, cpf: undefined })
  const formRef = useRef<FormHandles>(null)
  const { error } = useSelector((state: RootState) => state.auth)
  const { addresses, activeAddressId, user } = useSelector(
    (state: RootState) => state.user,
  )
  const activeAdress = addresses?.find(
    address => address.id === activeAddressId,
  )
  const [
    deliveryOrPickup,
    setDeliveryOrPickup,
  ] = useState<IDeliveryOrPickup | null>(null)

  const handleSubmitCheckoutData = async () => {
    if (!paymentMethod?.id) {
      dispatch(requestError(['Escolha um método de pagamento']))
      return
    }
    if (!checkoutForm.phone) {
      dispatch(requestError(['Adicione um telefone para contato']))
      return
    }
    if (!deliveryOrPickup?.hour) {
      dispatch(
        requestError(['Escolha um dia e horário para receber ou retirar']),
      )
      return
    }
    const dataToSubmit = {
      isTakeOut: market?.delivery ? !deliveryOrPickup?.delivery : true,
      marketId: market?.id,
      items,
      paymentMethodId: paymentMethod?.id,
      addressId: activeAddressId,
      windowId: deliveryOrPickup?.hour,
      contact: checkoutForm.phone,
    }
    try {
      await checkoutSchema.validate(dataToSubmit, {
        abortEarly: false,
      })

      await api
        .post(`/user/${user?.id}/order`, dataToSubmit)
        .then((response: AxiosResponse) => {
          console.warn('post api', response)
        })
        .catch((reason: AxiosError) => {
          console.warn('post api error', reason.response?.data)
          return dispatch(requestError(reason.response?.data.errors))
        })

      dispatch(removeAllFromCart())
      navigate('Pedidos')
    } catch (err) {
      dispatch(requestError([err]))
    }
  }

  const openAddressModal = () => {
    setTypeModal('address')
    setOpenModal(true)
  }
  const openPaymentsModal = () => {
    setTypeModal('payments')
    setOpenModal(true)
  }

  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-primary-500')}>
      <Toast error={error} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={tailwind('-mb-12')}
      >
        <View
          style={tailwind(
            'bg-primary-500 flex-row -mt-4 h-32 px-4 items-center justify-between',
          )}
        >
          <View style={tailwind('flex-row items-center')}>
            <TouchableOpacity onPress={() => goBack()} style={tailwind('py-2')}>
              <Ionicons name="md-arrow-back" size={35} color="#fff" />
            </TouchableOpacity>
            <Text style={tailwind('text-white text-2xl ml-4')}>Checkout</Text>
            <View />
          </View>
        </View>
        <View style={tailwind('-mt-4 rounded-t-xl bg-white px-4 pt-4 pb-16')}>
          {market?.delivery ? (
            <DeliveryOrPickup
              style={tailwind('mb-4')}
              market={market}
              deliveryOrPickup={deliveryOrPickup}
              setDeliveryOrPickup={setDeliveryOrPickup}
            />
          ) : (
            <View>
              <Text style={tailwind('text-base mb-4')}>
                Esse mercado só aceita{' '}
                <Text style={tailwind('text-base text-red-500')}>
                  retiradas
                </Text>
              </Text>
            </View>
          )}
          {market?.delivery ? (
            <View
              style={tailwind(
                'border border-gray-300 rounded-lg py-2 px-2 mb-2',
              )}
            >
              <Text style={tailwind('text-base mb-2')}>Endereço</Text>
              <View
                style={tailwind(
                  'flex-row items-center mb-2 border border-primary-500 rounded-lg py-2 pl-2 pr-8',
                )}
              >
                <View
                  style={tailwind(
                    `w-4 h-4 relative rounded-full mx-2 items-center justify-center border-2 border-primary-500`,
                  )}
                >
                  <Feather
                    name="check"
                    size={12}
                    color={getColor('primary-500')}
                  />
                </View>
                <Text style={tailwind('text-base')}>
                  {activeAdress &&
                    `${activeAdress.street}, ${activeAdress.number}, ${activeAdress.aditionalInfo}, ${activeAdress.city}`}
                </Text>
              </View>
              <TouchableOpacity onPress={openAddressModal}>
                <Text
                  style={tailwind('text-primary-500 text-base text-center')}
                >
                  Alterar
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={tailwind(
                'border border-gray-300 rounded-lg py-2 px-2 mb-2',
              )}
            >
              <Text style={tailwind('text-base text-gray-700 mb-2')}>
                Retire no endereço:
              </Text>
              <View>
                <Text style={tailwind('text-lg mb-2')}>
                  {market?.address.street}, {market?.address.number},{' '}
                  {market?.address.city} {market?.address.aditionalInfo}
                </Text>
                <Text style={tailwind('text-lg mb-2')}>
                  CEP {market?.address.zipcode}
                </Text>
              </View>
            </View>
          )}
          <View
            style={tailwind('border border-gray-300 rounded-lg py-2 px-2 mb-2')}
          >
            <Text style={tailwind('text-base text-gray-700 mb-4')}>
              Informações do cliente
            </Text>
            <CheckoutForm
              formRef={formRef}
              setCheckoutForm={setCheckoutForm}
              checkoutForm={checkoutForm}
              style={tailwind('mb-4')}
            />
          </View>
          <View
            style={tailwind('border border-gray-300 rounded-lg py-2 px-2 mb-4')}
          >
            <Text style={tailwind('text-base text-gray-700 mb-2')}>
              Forma de pagamento
            </Text>
            {paymentMethod && (
              <View
                style={tailwind(
                  'flex-row items-center mb-2 border border-primary-500 rounded-lg py-2 px-2',
                )}
              >
                <View
                  style={tailwind(
                    `w-4 h-4 relative rounded-full mx-2 items-center justify-center border-2 border-primary-500`,
                  )}
                >
                  <Feather
                    name="check"
                    size={12}
                    color={getColor('primary-500')}
                  />
                </View>
                <Text
                  style={tailwind('text-base')}
                >{`${paymentMethod.method} - ${paymentMethod.payment}`}</Text>
              </View>
            )}
            <TouchableOpacity onPress={openPaymentsModal}>
              <Text style={tailwind('text-primary-500 text-base text-center')}>
                {paymentMethod ? 'Alterar' : 'Escolha uma forma de pagamento'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tailwind('flex-row items-end justify-end mb-2')}>
            <Text style={tailwind('text-base text-gray-700 mr-1')}>Total:</Text>
            <Text style={tailwind('text-lg text-primary-500')}>{total}</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleSubmitCheckoutData()}
            style={tailwind(
              'mb-4 flex-row items-center justify-center bg-primary-500 items-center rounded py-3',
            )}
          >
            <Text style={tailwind('text-base text-white uppercase mr-3')}>
              Concluir pedido
            </Text>
            <Ionicons name="md-checkmark" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <CheckoutModal
        open={openModal}
        setOpenModal={setOpenModal}
        setTypeModal={setTypeModal}
        checked={paymentMethod}
        setChecked={setPaymentMethod}
        type={typeModal}
      />
    </SafeAreaView>
  )
}
Checkout.displayName = 'Checkout'

export default Checkout
