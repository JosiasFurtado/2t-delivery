import React, { Dispatch, SetStateAction } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import LayoutModal from '../LayoutModal'
import { removeAllFromCart } from 'store/modules/cart/actions'
import { useDispatch } from 'react-redux'
import { tailwind } from 'lib/styles'

interface CartClearProps {
  readonly open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const CartClear: React.FC<CartClearProps> = ({ open, setOpenModal }) => {
  const dispatch = useDispatch()
  const handleDeleteAllFromCart = () => {
    dispatch(removeAllFromCart())
    setOpenModal(false)
  }

  return (
    <LayoutModal
      title="Esvaziar o carrinho"
      open={open}
      setOpenModal={setOpenModal}
    >
      <View style={tailwind('rounded-t-lg bg-white px-5 py-3')}>
        <Text style={tailwind('text-primary-500 text-2xl font-medium pt-4')}>
          Tem certeza disso?
        </Text>
        <Text style={tailwind('text-gray-500 text-lg mb-12')}>
          Se esvaziar não tem mais volta
        </Text>
        <View style={tailwind('flex-row w-full mb-12')}>
          <TouchableOpacity
            onPress={handleDeleteAllFromCart}
            style={tailwind('bg-red-500 w-1/2 py-3 items-center rounded-lg')}
          >
            <Text style={tailwind('text-white font-bold text-base')}>
              ESVAZIAR CARRINHO
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setOpenModal(false)}
            style={tailwind(
              'bg-primary-500 w-1/2 ml-1 items-center rounded-lg py-3',
            )}
          >
            <Text style={tailwind('text-white font-bold text-base')}>
              VOLTAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LayoutModal>
  )
}

CartClear.displayName = 'CartClear'

export default CartClear
