import React, { Dispatch, SetStateAction, useState } from 'react'
import { Text, ScrollView, View } from 'react-native'
import { tailwind } from 'lib/styles'
import PrimaryButton from 'components/styledComponents/PrimaryButton'
import LayoutModal from '../LayoutModal'
import handleDirectToContact2T from 'utils/contact2t'
import { Order } from 'types/app'

interface HelpProps {
  readonly open: boolean
  readonly order: Order | undefined
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const Help: React.FC<HelpProps> = ({ open, order, setOpenModal }) => {
  const [openMarketContacts, setOpenMarketContacts] = useState(false)

  const contactTypeFormat = (type: string) => {
    if(type.includes('WHATS')) {
      return 'Whatsapp'
    }
    if(type.includes('MOBILE')) {
      return 'Celular'
    }
    return 'Telefone'
  }
  return (
    <LayoutModal title="Ajuda" open={open} setOpenModal={setOpenModal}>
      <ScrollView style={tailwind('rounded-t-lg bg-white px-5 pt-3 pb-6')}>
        <Text
          style={tailwind('text-primary-500 text-2xl font-medium pt-4 mb-2')}
        >
          Houve algum problema?
        </Text>
        <Text style={tailwind('text-gray-600 text-lg mb-12 leading-7')}>
          A 2T delivery não é responsável pela separação e entrega dos produtos.
          Caso tenha algum problema depois de já feito o pedido, entre em
          contato direto com o lojista, clicando no botão abaixo. Caso tenha
          tido qualquer problema na utilização do app, já pedimos desculpas, mas
          entre em contato conosco que estaremos prontos para te ajudar.
        </Text>
        <Text style={tailwind('text-2xl mb-4')}>Entrar em contato com:</Text>
        {order?.market.phones[0] && (
          <View style={tailwind('mb-6')}>
        <PrimaryButton
          onPress={() => setOpenMarketContacts(!openMarketContacts)}
          >
          <Text style={tailwind('text-xl text-white')}>Estabelecimento</Text>
        </PrimaryButton>
        {openMarketContacts && (
          <View style={tailwind('bg-gray-300 rounded p-2 items-center')}>
            {order.market.phones.map(phone => (
              <Text key={phone.id.toString()} style={tailwind('mb-2 text-base')}>{contactTypeFormat(phone.type)} - {phone.number}</Text>
            ))}
          </View>
        )}
          </View>
        )}
        <PrimaryButton
          onPress={handleDirectToContact2T}
          style={tailwind('mb-8')}
        >
          <Text style={tailwind('text-xl text-white')}>2T Delivery</Text>
        </PrimaryButton>
      </ScrollView>
    </LayoutModal>
  )
}

Help.displayName = 'Help'

export default Help
