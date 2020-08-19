import React from 'react'
import { StyleProp, View, ViewStyle, Text } from 'react-native'
import { tailwind } from 'lib/styles'

interface HeaderProps {
  readonly style?: StyleProp<ViewStyle>
}

const Header: React.FC<HeaderProps> = ({ style }) => {
  return (
    <View style={tailwind('bg-primary-500 h-32')}>
      <Text>Header</Text>
    </View>
  )
}

Header.displayName = 'Header'

export default Header
