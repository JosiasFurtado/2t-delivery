import React from 'react'
import {
  StyleProp,
  View,
  ViewStyle,
  Text,
  TouchableOpacity,
} from 'react-native'
import { tailwind } from 'lib/styles'
import { FontAwesome5 } from '@expo/vector-icons'

interface TaxWarnProps {
  readonly style?: StyleProp<ViewStyle>
}

const TaxWarn: React.FC<TaxWarnProps> = ({ style }) => {
  return (
    <View
      style={[
        style,
        tailwind('flex-row items-center justify-between rounded-lg py-2 px-4'),
        { borderColor: '#019853', borderWidth: 2 },
      ]}
    >
      <View>
        <Text style={tailwind('text-lg')}>
          Pedido Mínimo:{' '}
          <Text style={tailwind('text-primary-500')}>R$ 00,00</Text>
        </Text>
        <Text style={tailwind('text-lg')}>
          Taxa entrega:{' '}
          <Text style={tailwind('text-primary-500')}>R$ 00,00</Text>
        </Text>
      </View>
      <TouchableOpacity
        style={tailwind(
          'w-8 h-8 rounded bg-primary-500 items-center justify-center',
        )}
      >
        <FontAwesome5 name="info" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}

TaxWarn.displayName = 'TaxWarn'

export default TaxWarn
