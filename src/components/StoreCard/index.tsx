import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import StoreCardVertical from './StoreCardVertical'
import StoreCardHorizontal from './StoreCardHorizontal'

interface StoreCardProps {
  readonly style?: StyleProp<ViewStyle>
  readonly type: 'horizontal' | 'vertical'
}

const StoreCard: React.FC<StoreCardProps> = ({ type, style }) => {
  if (type === 'vertical') {
    return <StoreCardVertical style={style} />
  }
  return <StoreCardHorizontal style={style} />
}

StoreCard.displayName = 'StoreCard'

export default StoreCard
