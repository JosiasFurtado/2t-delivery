import React, { Dispatch, SetStateAction, useRef } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { tailwind } from 'lib/styles'
import PrimaryButton from 'components/styledComponents/PrimaryButton'
import LayoutModal from '../LayoutModal'
import UpdateUserForm from 'components/Form/UpdateUserForm'
import { FormHandles } from '@unform/core'

interface ConfigProps {
  readonly open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const Config: React.FC<ConfigProps> = ({ open, setOpenModal }) => {
  const formRef = useRef<FormHandles>(null)
  const handleSubmitUpdateUser = () => { }

  return (
    <LayoutModal title="Configurações" open={open} setOpenModal={setOpenModal}>
      <View style={tailwind('rounded-t-lg bg-white px-5 pt-3 pb-12')}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={tailwind('text-primary-500 text-2xl font-medium pt-4')}>
            Quer alterar algum dos seus dados?
          </Text>
          <Text style={tailwind('text-gray-500 text-lg mb-6')}>
            Altere o que desejar, você decide
          </Text>
          <UpdateUserForm
            formRef={formRef}
            handleSubmit={handleSubmitUpdateUser}
            style={tailwind('mb-6')}
          />
          <PrimaryButton
            onPress={handleSubmitUpdateUser}
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
