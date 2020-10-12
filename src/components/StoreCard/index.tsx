import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import StoreCardVertical from './StoreCardVertical'
import StoreCardHorizontal from './StoreCardHorizontal'
import { Market } from 'types/app'

interface StoreCardProps {
  readonly style?: StyleProp<ViewStyle>
  readonly type: 'horizontal' | 'vertical'
  readonly market: Market
}

const StoreCard: React.FC<StoreCardProps> = ({ type, style, market }) => {
  if (type === 'vertical') {
    return <StoreCardVertical style={style} market={market} />
  }
  return <StoreCardHorizontal style={style} market={market} />
}

StoreCard.displayName = 'StoreCard'

export default StoreCard
