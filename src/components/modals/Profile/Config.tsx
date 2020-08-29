import React, { Dispatch, SetStateAction } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { tailwind } from 'lib/styles'
import PrimaryButton from 'components/styledComponents/PrimaryButton'
import LayoutModal from '../LayoutModal'

interface ConfigProps {
  readonly open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const Config: React.FC<ConfigProps> = ({ open, setOpenModal }) => {
  const handleChangeUserAddress = () => {}

  return (
    <LayoutModal title="Configurações" open={open} setOpenModal={setOpenModal}>
      <View style={tailwind('rounded-t-lg bg-white px-5 py-3')}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={tailwind('text-primary-500 text-2xl font-medium pt-4')}>
            Quer alterar algum dos seus dados?
          </Text>
          <Text style={tailwind('text-gray-500 text-lg mb-16')}>
            Altere o que desejar, você decide
          </Text>
          <PrimaryButton
            onPress={handleChangeUserAddress}
            style={tailwind('mb-8')}
          >
            <Text style={tailwind('text-xl text-white')}>Alterar</Text>
          </PrimaryButton>
        </ScrollView>
      </View>
    </LayoutModal>
  )
}

Config.displayName = 'Config'

export default Config
