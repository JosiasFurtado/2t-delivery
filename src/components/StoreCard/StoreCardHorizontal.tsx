import React from 'react'
import {
  StyleProp,
  View,
  ViewStyle,
  Image,
  Text,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native'
import { tailwind } from 'lib/styles'
import DeliverymanIcon from '../../../assets/png/deliveryman-icon.png'

interface StoreCardHorizontalProps {
  readonly style?: StyleProp<ViewStyle>
}

const StoreCardHorizontal: React.FC<StoreCardHorizontalProps> = ({ style }) => (
  <TouchableHighlight>
    <View
      style={[
        tailwind('bg-white rounded-lg flex-row items-start w-full px-3 py-2'),
        { borderColor: '#edf2f7', borderWidth: 1 },
        style,
      ]}
    >
      <Image
        style={[
          tailwind('w-20 h-20 rounded-lg'),
          { borderColor: '#edf2f7', borderWidth: 2 },
        ]}
        resizeMode="cover"
        source={{
          uri:
            'https://image.freepik.com/vetores-gratis/logotipo-da-empresa-de-negocios-de-mercado-fresco_23-2148462395.jpg',
        }}
      />
      <View style={tailwind('px-2 w-4/5')}>
        <Text
          numberOfLines={1}
          lineBreakMode="tail"
          style={tailwind('text-lg font-bold')}
        >
          FreshMarket
        </Text>
        <Text
          numberOfLines={2}
          lineBreakMode="tail"
          style={tailwind('text-base mb-2 text-gray-600 text-left')}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. asdasd
          asdasdsa asds sadasdsad sadad sad
        </Text>
        <View style={tailwind('flex-row justify-between items-center')}>
          <View style={tailwind('flex-row items-center')}>
            <Image
              resizeMode="contain"
              style={tailwind('h-6 w-6')}
              source={DeliverymanIcon}
            />
            <Text style={tailwind('text-base ml-1')}>Hoje, 12:00 hrs</Text>
          </View>
          <Text style={tailwind('text-xs text-gray-700')}>
            Valor mínimo: R$50,00
          </Text>
        </View>
      </View>
    </View>
  </TouchableHighlight>
)

StoreCardHorizontal.displayName = 'StoreCardHorizontal'

export default StoreCardHorizontal
