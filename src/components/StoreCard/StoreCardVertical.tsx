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
import Bg2t from '../../../assets/png/bg-image.png'
import { tailwind } from 'lib/styles'
import { Market } from 'types/app'

interface StoreCardVerticalProps {
  readonly style?: StyleProp<ViewStyle>
  readonly market: Market
}

const StoreCardVertical: React.FC<StoreCardVerticalProps> = ({ style, market }) => (
  <TouchableOpacity
    style={[style, tailwind('bg-white shadow-md rounded-lg w-38 px-2 py-2')]}
  >
    {market.imageUrl ? (
      <Image
      style={[
        tailwind('w-full h-32 rounded-lg mb-1 bg-gray-200'),
        { borderColor: '#edf2f7', borderWidth: 2 },
      ]}
      resizeMode="cover"
      source={{
        uri:
          market.imageUrl
      }}
    />
    ) : (
      <View style={tailwind('w-full h-32 rounded-lg mb-1 bg-gray-200')} />
    )}
    <View style={tailwind('flex justify-between h-32 pb-1')}>
      <View>
    <Text
      numberOfLines={1}
      lineBreakMode="tail"
      style={tailwind('text-lg font-bold mb-1')}
    >
      {market.name}
    </Text>
    <Text
      numberOfLines={3}
      lineBreakMode="tail"
      style={tailwind('text-base mb-2 text-gray-600 text-justify')}
    >
      {market.bio || market.slogan}
    </Text>
    </View>
    <View style={tailwind('flex-row items-center')}>
      <Image
        resizeMode="contain"
        style={tailwind('h-5 w-5')}
        source={DeliverymanIcon}
      />
      <Text style={tailwind('text-sm ml-1')}>Hoje, 12:00 hrs</Text>
    </View>
    </View>
  </TouchableOpacity>
)

StoreCardVertical.displayName = 'StoreCardVertical'

export default StoreCardVertical
