import React from 'react'
import { StyleProp, View, ViewStyle, SafeAreaView, Text } from 'react-native'
import { tailwind } from 'lib/styles'

interface HelpProps {
  readonly style?: StyleProp<ViewStyle>
}

const Help: React.FC<HelpProps> = () => {
  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-white')}>
      <View>
        <Text>Ajuda</Text>
      </View>
    </SafeAreaView>
  )
}

Help.displayName = 'Help'

export default Help
