import React, { useState, useMemo } from 'react'
import { StyleProp, View, ViewStyle, Dimensions } from 'react-native'
import CarouselView, { Pagination } from 'react-native-snap-carousel'
import { tailwind } from 'lib/styles'
import AdvertisingCarouselItem from './AdvertisingCarouselItem'
import { AdvertisingCarouselItemType } from 'types/app'
import banner01 from '../../../assets/banners/01.jpg'
import banner02 from '../../../assets/banners/02.jpg'
import banner03 from '../../../assets/banners/03.jpg'
import banner04 from '../../../assets/banners/04.jpg'
import banner05 from '../../../assets/banners/05.jpg'

interface CarouselProps {
  readonly style?: StyleProp<ViewStyle>
}

const dataCarousel: AdvertisingCarouselItemType[] = [
  {
    id: '01',
    image: banner01
  },
  {
    id: '02',
    image: banner02
  },
  {
    id: '03',
    image: banner03,
  },
  {
    id: '04',
    image: banner04,
  },
  {
    id: '05',
    image: banner05,
  }
]

const Carousel: React.FC<CarouselProps> = ({ style }) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const { width: viewportWidth } = Dimensions.get('window')

  const renderItem = ({ item }: { item: AdvertisingCarouselItemType }) => {
    return <AdvertisingCarouselItem key={item.id} item={item} />
  }

  const memoizedValue = useMemo(() => renderItem, [dataCarousel])
  return (
    <View style={style}>
      <CarouselView
        layout="default"
        data={dataCarousel}
        renderItem={memoizedValue}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth}
        slideStyle={{ flex: 1 }}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        onSnapToItem={index => setActiveSlide(index)}
        enableSnap
        loop
        autoplay
      />
      <Pagination
        dotsLength={dataCarousel.length}
        activeDotIndex={activeSlide}
        containerStyle={[
          tailwind('h-4 -mt-10 w-16 z-10'),
          { marginLeft: 'auto', marginRight: 'auto' },
        ]}
        dotColor="rgba(255, 255, 255, 0.92)"
        dotStyle={{ width: 8, height: 8, borderRadius: 4 }}
        inactiveDotColor="#000"
        inactiveDotOpacity={0.3}
        inactiveDotScale={0.6}
      />
    </View>
  )
}

Carousel.displayName = 'Carousel'

export default Carousel
