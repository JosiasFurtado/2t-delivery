import React from 'react'
import { StyleProp, View, ViewStyle, Text } from 'react-native'

interface StoreCardProps {
  readonly style?: StyleProp<ViewStyle>
}

const StoreCard: React.FC<StoreCardProps> = ({ style }) => (
  <View style={[style]}>
    <Text>card</Text>
  </View>
)

StoreCard.displayName = 'StoreCard'

export default StoreCard
