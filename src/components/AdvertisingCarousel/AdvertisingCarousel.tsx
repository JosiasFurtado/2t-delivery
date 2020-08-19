import React, { useState } from 'react'
import { StyleProp, View, ViewStyle, Dimensions } from 'react-native'
import CarouselView, { Pagination } from 'react-native-snap-carousel'
import { tailwind } from 'lib/styles'
import AdvertisingCarouselItem from './AdvertisingCarouselItem'
import { AdvertisingCarouselItemType } from 'types/app'

interface CarouselProps {
  readonly style?: StyleProp<ViewStyle>
}

const dataCarousel: AdvertisingCarouselItemType[] = [
  {
    id: 0,
    image_url:
      'https://image.freepik.com/vetores-gratis/modelo-de-anuncio-comida-para-hamburguer_23-2148449854.jpg',
  },
  {
    id: 1,
    image_url:
      'https://i.pinimg.com/736x/e2/c9/80/e2c980b8ea4ca3c53be25d7d885012a5.jpg',
  },
  {
    id: 2,
    image_url:
      'https://image.freepik.com/fotos-gratis/close-up-de-escuro-ardosia-preta-pedra-fundo_23-2148118059.jpg',
    description: 'Descrição opcional',
  },
  {
    id: 3,
    description: 'Descrição de exemplo',
  },
]

const Carousel: React.FC<CarouselProps> = ({ style }) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const { width: viewportWidth } = Dimensions.get('window')

  const renderItem = ({ item }: { item: AdvertisingCarouselItemType }) => {
    return <AdvertisingCarouselItem key={item.id} item={item} />
  }

  return (
    <View style={style}>
      <CarouselView
        layout="default"
        data={dataCarousel}
        renderItem={renderItem}
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
