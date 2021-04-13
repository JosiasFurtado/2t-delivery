import React, { Dispatch, SetStateAction } from 'react'
import { StyleProp, Text, View, ViewStyle, TextInput } from 'react-native'
import LayoutModal from '../LayoutModal'
import { tailwind, getColor } from 'lib/styles'
import PrimaryButton from 'components/styledComponents/PrimaryButton'
import { useDispatch } from 'react-redux'
import { updateProductComment } from 'store/modules/cart/actions'

interface ItemCommentProps {
  readonly style?: StyleProp<ViewStyle>
  readonly open: boolean
  readonly comment: { 
    comment: string | undefined
    productId: number | undefined
  } | undefined
  setComment: Dispatch<SetStateAction<{ 
    comment: string | undefined
    productId: number | undefined
  } | undefined>>
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const ItemComment: React.FC<ItemCommentProps> = ({
  open,
  setOpenModal,
  setComment,
  comment,
}) => {
  const dispatch = useDispatch()

  const handleUpdateComment = (newComment?: string, productId?: number) => {
    if(newComment && productId) {
      dispatch(updateProductComment(newComment, productId))
      setOpenModal(false)
    }
  }
  return (
    <LayoutModal title="Observação" open={open} setOpenModal={setOpenModal}>
      <View style={tailwind('rounded-t-lg bg-white px-5 pt-3 pb-12')}>
        <Text style={tailwind('text-primary-500 text-2xl font-medium pt-4')}>
          Se necessário, adicione uma observação
        </Text>
        <Text style={tailwind('text-gray-500 text-lg mb-8')}>
          O mercado estará atento ao seu gosto
        </Text>
        <View style={tailwind('mb-8')}>
          <TextInput
            placeholder="Exemplo: Quero bananas mais verdes"
            allowFontScaling={false}
            multiline
            numberOfLines={3}
            autoCorrect={false}
            autoCapitalize="none"
            value={comment?.comment}
            onChangeText={text => setComment({comment: text, productId: comment?.productId})}
            placeholderTextColor={getColor('gray-500')}
            style={tailwind('bg-gray-200 rounded-lg px-4 py-2 mb-6 text-lg')}
          />
          <PrimaryButton onPress={() => handleUpdateComment(comment?.comment, comment?.productId)}>
            <Text style={tailwind('text-xl text-white')}>Alterar</Text>
          </PrimaryButton>
        </View>
      </View>
    </LayoutModal>
  )
}

ItemComment.displayName = 'ItemComment'

export default ItemComment
