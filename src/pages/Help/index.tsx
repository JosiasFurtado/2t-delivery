import React from 'react'
import { StyleProp, View, ViewStyle, SafeAreaView, Text } from 'react-native'
import { tailwind } from 'lib/styles'

interface HelpProps {
  readonly style?: StyleProp<ViewStyle>
}

const Help: React.FC<HelpProps> = () => {
  return (
    <View style={tailwind('flex-1 relative bg-primary-500')}>
      <Text style={tailwind('text-white text-2xl')}>Ajuda</Text>
    </View>
  )
}

Help.displayName = 'Help'

export default Help
