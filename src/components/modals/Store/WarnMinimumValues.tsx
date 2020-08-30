import React, { Dispatch, SetStateAction } from 'react'
import { StyleProp, Text, View, ViewStyle } from 'react-native'
import LayoutModal from '../LayoutModal'
import { tailwind } from 'lib/styles'
import PrimaryButton from 'components/styledComponents/PrimaryButton'

interface WarnMinimumValuesProps {
  readonly style?: StyleProp<ViewStyle>
  readonly open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const WarnMinimumValues: React.FC<WarnMinimumValuesProps> = ({
  style,
  open,
  setOpenModal,
}) => {
  const handleConfirmWarn = () => {
    setOpenModal(false)
  }
  return (
    <LayoutModal title="Alerta" open={open} setOpenModal={setOpenModal}>
      <View style={[tailwind('rounded-t-lg bg-white px-5 py-3'), style]}>
        <Text style={tailwind('text-primary-500 text-2xl font-medium pt-4')}>
          Valor mínimo e taxa de entrega
        </Text>
        <Text style={tailwind('text-gray-500 text-lg mb-12')}>
          Taxas que ajudam a manter o melhor serviço para você
        </Text>
        <Text style={tailwind('text-xl mb-16')}>
          Esses valores são definidos pelo mercado
        </Text>
        <PrimaryButton onPress={handleConfirmWarn} style={tailwind('mb-8')}>
          <Text style={tailwind('text-xl text-white')}>Fechar</Text>
        </PrimaryButton>
      </View>
    </LayoutModal>
  )
}

WarnMinimumValues.displayName = 'WarnMinimumValues'

export default WarnMinimumValues
