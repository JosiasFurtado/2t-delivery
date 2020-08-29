import React, { ReactNode, Dispatch, SetStateAction } from 'react'
import { Text, Modal, StatusBar, TouchableOpacity } from 'react-native'
import { tailwind, getColor } from 'lib/styles'
import { Ionicons } from '@expo/vector-icons'
import styled from 'styled-components/native'

const BgModal = styled.View`
  background-color: rgba(0, 0, 0, 0.4);
  flex: 1;
  justify-content: flex-end;
`

interface LayoutModalProps {
  readonly children: ReactNode
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
          style={tailwind('px-5 mb-4')}
        >
          <Ionicons name="md-arrow-back" size={35} color="#fff" />
        </TouchableOpacity>
        {title && (
          <Text style={tailwind('px-5 mb-4 text-3xl text-white')}>{title}</Text>
        )}
        {children}
      </BgModal>
    </Modal>
  )
}

LayoutModal.displayName = 'LayoutModal'

export default LayoutModal