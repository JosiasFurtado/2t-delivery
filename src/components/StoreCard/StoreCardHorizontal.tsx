import React, { useMemo } from 'react'
import {
  StyleProp,
  View,
  ViewStyle,
  Image,
  Text,
  TouchableHighlight,
} from 'react-native'
import { tailwind } from 'lib/styles'
import DeliverymanIcon from '../../../assets/png/deliveryman-icon.png'
import { useNavigation } from '@react-navigation/native'
import { Market } from 'types/app'
import formatPrice from 'utils/formatPrice'
import moment from 'moment'

interface StoreCardHorizontalProps {
  readonly style?: StyleProp<ViewStyle>
  readonly market: Market
}

const StoreCardHorizontal: React.FC<StoreCardHorizontalProps> = ({ style, market }) => {
  moment.locale('en')
  const { navigate } = useNavigation()

  const todayWeekDay = moment().format('dddd').toLowerCase()
  const todayDeliveryTimesArr = useMemo(
    () => market.windows.filter(item => item.weekDay === todayWeekDay).sort(),
    [todayWeekDay, market],
  )
  const compareHour = todayDeliveryTimesArr.filter(item => moment().isBefore(`${moment().format().slice(0,11)}${item.startsAt}`, "hour"))
  console.warn("teste", compareHour[0],todayDeliveryTimesArr)

  // Faltou alterar dia para o proximo, caso ja tenha passado todos
  // os horarios e externar a função.
  
  return (
    <TouchableHighlight
      underlayColor="#fff"
      style={tailwind('rounded-lg mb-2')}
      onPress={() => navigate('StorePage')}
    >
      <View
        style={[
          tailwind('bg-white rounded-lg flex-row items-start w-full px-3 py-2 border border-gray-300'),
          style,
        ]}
      >
        {market.imageUrl ? (
      <Image
      style={[
        tailwind('w-20 h-20 rounded-lg mb-1 bg-gray-200'),
        { borderColor: '#edf2f7', borderWidth: 2 },
      ]}
      resizeMode="cover"
      source={{
        uri:
          market.imageUrl
      }}
    />
    ) : (
      <View style={tailwind('w-20 h-20 rounded-lg mb-1 bg-gray-200')} />
    )}
        <View style={tailwind('px-2 w-4/5')}>
          <Text
            numberOfLines={1}
            lineBreakMode="tail"
            style={tailwind('text-lg font-bold')}
          >
            {market.name}
          </Text>
          <Text
            numberOfLines={2}
            lineBreakMode="tail"
            style={tailwind('text-base mb-2 text-gray-600 text-left')}
          >
            {market.slogan || market.bio}
          </Text>
          <View style={tailwind('flex-row justify-between items-center')}>
            {compareHour[0] && (
            <View style={tailwind('flex-row items-center')}>
              <Image
                resizeMode="contain"
                style={tailwind('h-4 w-4')}
                source={DeliverymanIcon}
              />
              <Text style={tailwind('text-xs ml-1')}>Hoje, {compareHour[0].startsAt.slice(0, 5)} hrs</Text>
            </View>
            )}
            <Text style={tailwind('text-xs text-gray-700')}>
              Valor mínimo: {formatPrice(market.minimalPrice)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  )
}

StoreCardHorizontal.displayName = 'StoreCardHorizontal'

export default StoreCardHorizontal
