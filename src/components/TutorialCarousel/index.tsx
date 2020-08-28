import React, { useState } from 'react'
import {
  StyleProp,
  View,
  ViewStyle,
  Dimensions,
  Text,
  Image,
} from 'react-native'
import Stores from '../../../assets/png/stores.png'
import CartInCellphone from '../../../assets/png/cart-in-cellphone.png'
import Shoppers from '../../../assets/png/shoppers.png'
import TimeManagement from '../../../assets/png/time-management.png'
import CarouselView, { Pagination } from 'react-native-snap-carousel'
import { tailwind } from 'lib/styles'
import { TutorialCarouselItemType } from 'types/app'

interface TutorialCarouselProps {
  readonly style?: StyleProp<ViewStyle>
}

const dataCarousel: TutorialCarouselItemType[] = [
  {
    id: 0,
    image: Stores,
    title: 'Escolha sua loja preferida',
    description: 'Compre dos melhores estabelecimentos das sua região',
  },
  {
    id: 1,
    image: CartInCellphone,
    title: 'Adicione produtos ao seu carrinho',
    description:
      'Passeie pelos corredores ou procure por seus produtos favoritos',
  },
  {
    id: 2,
    image: Shoppers,
    title: 'Seu companheiro shopper',
    description:
      'Os shoppers são treinados para escolher seus produtos com carinho',
  },
  {
    id: 3,
    image: TimeManagement,
    title: 'Seu tempo e felicidade importam',
    description:
      'Escolha o melhor horário e continue fazendo o que te faz feliz enquanto cuidamos do seu pedido',
  },
]

const TutorialCarousel: React.FC<TutorialCarouselProps> = ({ style }) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const { width: viewportWidth } = Dimensions.get('window')

  const renderItem = ({ item }: { item: TutorialCarouselItemType }) => {
    return (
      <View
        key={item.id}
        style={[tailwind('justify-center items-center'), { height: '85%' }]}
      >
        <Text style={tailwind('text-2xl text-center text-gray-700 mb-2')}>
          {item.title}
        </Text>
        <Image
          source={item.image}
          resizeMode="contain"
          style={[tailwind('w-4/5 mb-4'), { height: '70%' }]}
        />
        <Text style={tailwind('text-xl px-4 text-center text-gray-700')}>
          {item.description}
        </Text>
      </View>
    )
  }

  return (
    <View style={style}>
      <CarouselView
        layout="default"
        data={dataCarousel}
        renderItem={renderItem}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        onSnapToItem={index => setActiveSlide(index)}
        enableSnap
        loop
      />
      <Pagination
        dotsLength={dataCarousel.length}
        activeDotIndex={activeSlide}
        containerStyle={[
          tailwind('h-4 w-16 z-10 -mt-12'),
          { marginLeft: 'auto', marginRight: 'auto' },
        ]}
        dotColor="#019853"
        dotStyle={{ width: 10, height: 10, borderRadius: 5 }}
        inactiveDotColor="#000"
        inactiveDotOpacity={0.3}
        inactiveDotScale={0.6}
      />
    </View>
  )
}

TutorialCarousel.displayName = 'TutorialCarousel'

export default TutorialCarousel
