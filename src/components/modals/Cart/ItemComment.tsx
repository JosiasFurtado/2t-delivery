import React, { Dispatch, SetStateAction, useState } from 'react'
import { StyleProp, Text, View, ViewStyle, TextInput } from 'react-native'
import LayoutModal from '../LayoutModal'
import { tailwind, getColor } from 'lib/styles'

interface ItemCommentProps {
  readonly style?: StyleProp<ViewStyle>
  readonly open: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const ItemComment: React.FC<ItemCommentProps> = ({ open, setOpenModal }) => {
  const [commentValue, setCommentValue] = useState('')
  return (
    <LayoutModal title="Observação" open={open} setOpenModal={setOpenModal}>
      <View style={tailwind('rounded-t-lg bg-white px-5 py-3')}>
        <Text style={tailwind('text-primary-500 text-2xl font-medium pt-4')}>
          Se necessário, adicione uma observação
        </Text>
        <Text style={tailwind('text-gray-500 text-lg mb-8')}>
          O mercado estará atento ao seu gosto
        </Text>
        <View style={tailwind('mb-6')}>
          <TextInput
            placeholder="Exemplo: Quero bananas mais verdes"
            allowFontScaling={false}
            multiline={true}
            numberOfLines={3}
            autoCorrect={false}
            autoCapitalize="none"
            value={commentValue}
            onChangeText={text => setCommentValue(text)}
            placeholderTextColor={getColor('gray-500')}
            style={tailwind('bg-gray-200 rounded-lg px-4 py-2 mb-4 text-lg')}
          />
        </View>
      </View>
    </LayoutModal>
  )
}

ItemComment.displayName = 'ItemComment'

export default ItemComment
