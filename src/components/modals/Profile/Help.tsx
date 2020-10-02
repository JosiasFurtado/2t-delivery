import React, { Dispatch, SetStateAction } from 'react'
import { Text, ScrollView, View } from 'react-native'
import { tailwind } from 'lib/styles'
import PrimaryButton from 'components/styledComponents/PrimaryButton'
import LayoutModal from '../LayoutModal'

interface HelpProps {
  readonly open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const Help: React.FC<HelpProps> = ({ open, setOpenModal }) => {
  const handleDirectToContact2T = () => { }

  return (
    <LayoutModal title="Ajuda" open={open} setOpenModal={setOpenModal}>
      <View style={tailwind('rounded-t-lg bg-white px-5 pt-3 pb-12')}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={tailwind('text-primary-500 text-2xl font-medium pt-4 mb-2')}
          >
            Houve algum problema?
          </Text>
          <Text style={tailwind('text-gray-600 text-lg mb-12 leading-7')}>
            A 2T delivery não é responsável pela separação e entrega dos
            produtos. Caso tenha algum problema depois de já feito o pedido,
            entre em contato direto com o lojista, clicando no botão de ajuda na
            aba de histórico de pedidos. Caso tenha tido qualquer problema na
            utilização do app, já pedimos desculpas, mas entre em contato
            conosco que estaremos prontos para te ajudar.
          </Text>
          <Text style={tailwind('text-2xl mb-4')}>Entrar em contato com:</Text>
          <PrimaryButton
            onPress={handleDirectToContact2T}
            style={tailwind('mb-6')}
          >
            <Text style={tailwind('text-xl text-white')}>2T Delivery</Text>
          </PrimaryButton>
        </ScrollView>
      </View>
    </LayoutModal>
  )
}

Help.displayName = 'Help'

export default Help
