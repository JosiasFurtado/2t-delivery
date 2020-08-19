import React from 'react'
import { StyleProp, View, ViewStyle, Image, Text } from 'react-native'
import { AdvertisingCarouselItemType } from 'types/app'
import { tailwind } from 'lib/styles'

interface CarouselItemProps {
  readonly style?: StyleProp<ViewStyle>
  readonly item: AdvertisingCarouselItemType
}

const CarouselItem: React.FC<CarouselItemProps> = ({ style, item }) => (
  <View
    style={[
      tailwind(
        'h-32 relative rounded-t-xl bg-primary-500 w-11/12 items-center',
      ),
      style,
    ]}
  >
    {item.image_url && (
      <Image
        source={{ uri: item.image_url }}
        style={tailwind('rounded-t-xl h-32 w-full')}
      />
    )}
    {item.description && (
      <Text
        style={tailwind('absolute text-white text-lg font-bold top-0 mt-1')}
      >
        {item.description}
      </Text>
    )}
  </View>
)

CarouselItem.displayName = 'CarouselItem'

export default CarouselItem
