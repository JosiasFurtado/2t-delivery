import React from 'react'
import {
  StyleProp,
  View,
  ViewStyle,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'
import DeliverymanIcon from '../../../assets/png/deliveryman-icon.png'
import { tailwind } from 'lib/styles'

interface StoreCardVerticalProps {
  readonly style?: StyleProp<ViewStyle>
}

const StoreCardVertical: React.FC<StoreCardVerticalProps> = ({ style }) => (
  <TouchableOpacity
    style={[style, tailwind('bg-white shadow-md rounded-lg w-38 px-2 py-2')]}
  >
    <Image
      style={[
        tailwind('w-full h-32 rounded-lg mb-1'),
        { borderColor: '#edf2f7', borderWidth: 2 },
      ]}
      resizeMode="cover"
      source={{
        uri:
          'https://image.freepik.com/vetores-gratis/logotipo-da-empresa-de-negocios-de-mercado-fresco_23-2148462395.jpg',
      }}
    />
    <Text
      numberOfLines={1}
      lineBreakMode="tail"
      style={tailwind('text-lg font-bold mb-1')}
    >
      FreshMarket
    </Text>
    <Text
      numberOfLines={3}
      lineBreakMode="tail"
      style={tailwind('text-base mb-2 text-gray-600 text-justify')}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </Text>
    <View style={tailwind('flex-row items-center')}>
      <Image
        resizeMode="contain"
        style={tailwind('h-5 w-5')}
        source={DeliverymanIcon}
      />
      <Text style={tailwind('text-sm ml-1')}>Hoje, 12:00 hrs</Text>
    </View>
  </TouchableOpacity>
)

StoreCardVertical.displayName = 'StoreCardVertical'

export default StoreCardVertical
