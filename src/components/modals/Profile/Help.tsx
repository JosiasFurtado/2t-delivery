import React, { Dispatch, SetStateAction } from 'react'
import {
  View,
  Text,
  Modal,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { tailwind, getColor } from 'lib/styles'
import { Ionicons } from '@expo/vector-icons'
import PrimaryButton from 'components/styledComponents/PrimaryButton'
import { BgModal } from '../LoginModal'

interface HelpProps {
  readonly open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const Help: React.FC<HelpProps> = ({ open, setOpenModal }) => {
  const handleDirectToContact2T = () => {}

  const handleDirectToContactStore = () => {}

  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent
      onRequestClose={() => setOpenModal(false)}
    >
      <StatusBar
        backgroundColor={getColor('primary-700')}
        barStyle="light-content"
      />
      <BgModal>
        <TouchableOpacity
          onPress={() => setOpenModal(!open)}
          style={tailwind('px-5 mt-10 mb-4')}
        >
          <Ionicons name="md-arrow-back" size={35} color="#fff" />
        </TouchableOpacity>
        <Text style={tailwind('px-5 mb-4 text-3xl text-white')}>Ajuda</Text>
        <ScrollView style={tailwind('rounded-t-lg bg-white px-5 py-3')}>
          <Text
            style={tailwind('text-primary-500 text-2xl font-medium pt-4 mb-2')}
          >
            Houve algum problema?
          </Text>
          <Text style={tailwind('text-gray-600 text-lg mb-12 leading-7')}>
            A 2T delivery não é responsável pela separação e entrega dos
            produtos. Caso tenha algum problema depois de ja feito o pedido,
            entre em contato direto com o lojista, clicando no botão abaixo.
            Caso tenha tido qualquer problmea na utilização do app, já pedimos
            desculpas, mas entre em contato conosco que estaremos prontos para
            te ajudar.
          </Text>
          <Text style={tailwind('text-2xl mb-6')}>Entrar em contato com:</Text>
          <PrimaryButton
            onPress={handleDirectToContactStore}
            style={tailwind('mb-6')}
          >
            <Text style={tailwind('text-xl text-white')}>Estabelecimento</Text>
          </PrimaryButton>
          <PrimaryButton
            onPress={handleDirectToContact2T}
            style={tailwind('mb-2')}
          >
            <Text style={tailwind('text-xl text-white')}>2T Delivery</Text>
          </PrimaryButton>
        </ScrollView>
      </BgModal>
    </Modal>
  )
}

Help.displayName = 'Help'

export default Help
