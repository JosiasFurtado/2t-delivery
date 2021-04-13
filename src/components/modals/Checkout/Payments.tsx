import React, { Dispatch, SetStateAction, useMemo } from 'react'
import { Text, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import { getColor, tailwind } from 'lib/styles'
import PrimaryButton from 'components/styledComponents/PrimaryButton'
import LayoutModal from '../LayoutModal'
import { CheckoutModals, Payment, PaymentSelected } from 'types/app'
import useMarketDetails from 'utils/useMarketDetails'
import { RootState } from 'store/modules/rootReducer'
import { useSelector } from 'react-redux'
import { Feather } from '@expo/vector-icons'
import { FlatList } from 'react-native-gesture-handler'

interface PaymentsProps {
  readonly open: boolean
  readonly checked: PaymentSelected | undefined
  setOpenModal: Dispatch<SetStateAction<boolean>>
  setTypeModal: Dispatch<SetStateAction<CheckoutModals>>
  setChecked: Dispatch<SetStateAction<PaymentSelected | undefined>>
}

const Payments: React.FC<PaymentsProps> = ({ open, checked, setOpenModal, setChecked }) => {
  const cart = useSelector((state: RootState) => state.cart)
  const [{ payments: paymentsMethods }] = useMarketDetails(cart[0] && cart[0].marketId || 1)

  const renderItem = ({ item }: { item: Payment }) => (
    <View key={String(item.id)}>
      <Text style={tailwind('text-base text-gray-700')}>{item.name}</Text>
      {item.methods.map(method => (
        <TouchableOpacity key={String(method.id)} onPress={() => setChecked({ id: method.id, payment: item.name, method: method.name })} style={tailwind(`flex-row items-center mb-2 border rounded-lg py-2 px-2 ${checked && checked.id === method.id ? "border-primary-500" : "border-gray-500"}`)}>
          <View style={tailwind(`w-4 h-4 relative rounded-full mx-2 items-center justify-center border-2 ${checked && checked.id === method.id ? "border-primary-500" : "border-gray-500"}`)}>
            <Feather name="check" size={12} color={checked && checked.id === method.id ? getColor("primary-500") : '#fff'} />
          </View>
          <Text style={tailwind('text-base')}>{method.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )

  const memoizedValue = useMemo(() => renderItem, [paymentsMethods, checked])

  return (
    <LayoutModal title="Pagamento" open={open} setOpenModal={setOpenModal}>
      <View style={tailwind('rounded-t-lg bg-white px-5 pt-3 pb-12')}>
        <Text
          style={tailwind('text-primary-500 text-2xl font-medium pt-4 mb-2')}
        >
          Métodos de pagamentos
          </Text>
        {paymentsMethods ? (
          <>
          <FlatList
            data={paymentsMethods}
            maxToRenderPerBatch={30}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator
            style={tailwind('h-65 mb-2')}
            renderItem={memoizedValue}
          />
          <PrimaryButton
          onPress={() => setOpenModal(false)}
          style={tailwind('mb-6')}
        >
          <Text style={tailwind('text-xl text-white')}>Confirmar</Text>
        </PrimaryButton>
        </>
        )
          :
          <View style={tailwind('items-center justify-center')}>
            <ActivityIndicator color={getColor('primary-500')} size={30} />
          </View>}
      </View>
    </LayoutModal>
  )
}

Payments.displayName = 'Payments'

export default Payments
