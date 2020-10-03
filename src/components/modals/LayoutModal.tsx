import React, { Dispatch, SetStateAction } from 'react'
import {
  Text,
  Modal,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { tailwind, getColor } from 'lib/styles'
import { Ionicons } from '@expo/vector-icons'
import styled from 'styled-components/native'

const BgModal = styled.SafeAreaView`
  background-color: rgba(0, 0, 0, 0.4);
  flex: 1;
  justify-content: flex-end;
`

interface LayoutModalProps {
  readonly open: boolean
  readonly title?: string
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const LayoutModal: React.FC<LayoutModalProps> = ({
  title,
  children,
  open,
  setOpenModal,
}) => {
  return (
    <Modal
      visible={open}
      animationType="fade"
      transparent
      onRequestClose={() => setOpenModal(false)}
    >
      <StatusBar
        backgroundColor={getColor('primary-700')}
        barStyle="light-content"
      />
      <BgModal style={tailwind('-mb-8 relative')}>
        <TouchableOpacity
          onPress={() => setOpenModal(!open)}
          style={tailwind('px-5 mb-2')}
        >
          <Ionicons name="md-arrow-back" size={35} color="#fff" />
        </TouchableOpacity>
        {title && (
          <Text style={tailwind('px-5 mb-4 text-3xl text-white')}>{title}</Text>
        )}
        <KeyboardAvoidingView
          enabled
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {children}
        </KeyboardAvoidingView>
      </BgModal>
    </Modal>
  )
}

LayoutModal.displayName = 'LayoutModal'

export default LayoutModal
