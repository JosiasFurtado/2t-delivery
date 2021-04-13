import React from 'react'
import {
  StyleProp,
  Text,
  View,
  ViewStyle,
  TouchableHighlight,
  Image,
  TouchableOpacity,
} from 'react-native'
import { tailwind, getColor } from 'lib/styles'
import { Ionicons } from '@expo/vector-icons'
import DeliverymanIcon from '../../../assets/png/deliveryman-icon.png'
import { useNavigation } from '@react-navigation/native'
import { Order } from 'types/app'
import BgStore from '../../../assets/png/bg-store.png'
import moment from 'moment'
import formatPrice from 'utils/formatPrice'
import translateWeekDay from 'utils/translateWeekDay'

interface RequestCardProps {
  readonly style?: StyleProp<ViewStyle>
  readonly order: Order
  handleOpenHelpModal(orderHelp: Order): void
}

const RequestCard: React.FC<RequestCardProps> = ({
  style,
  order,
  handleOpenHelpModal,
}) => {
  moment().locale('pt-br')
  const { navigate } = useNavigation()

  return (
    <TouchableHighlight
      style={[tailwind('shadow-md rounded-xl bg-white px-2 py-2'), style]}
      underlayColor={getColor('gray-100')}
      onPress={() => navigate('RequestDetail', { order })}
    >
      <View>
        <View
          style={tailwind(
            'flex-row pb-2 justify-between border-b border-gray-300',
          )}
        >
          <View style={tailwind('flex-row')}>
            <Image
              style={tailwind('w-20 h-20 rounded')}
              source={
                order.market.imageUrl ? { uri: order.market.imageUrl } : BgStore
              }
            />

            <View style={tailwind('ml-2')}>
              <Text style={tailwind('text-sm font-bold text-gray-800')}>
                {order.market.name.slice(0, 15)} - #{order.id}
              </Text>
              <View style={tailwind('flex-row items-center mb-2')}>
                <View style={tailwind('flex-row items-center')}>
                  <Ionicons
                    name="md-list-box"
                    size={16}
                    color={getColor('gray-600')}
                  />
                  <Text style={tailwind('text-gray-700 text-base ml-1')}>
                    {moment(order.createdAt).format('LT')}h
                  </Text>
                </View>
                <View style={tailwind('flex-row items-center ml-4')}>
                  <Ionicons
                    name="md-calendar"
                    size={16}
                    color={getColor('gray-600')}
                  />
                  <Text style={tailwind('text-gray-700 text-base ml-1')}>
                    {moment(order.createdAt).format('L')}
                  </Text>
                </View>
              </View>
              <View style={tailwind('flex-row items-center')}>
                {order.status === 'FINISHED' ? (
                  <Text style={tailwind('text-base text-primary-500')}>
                    Concluído
                  </Text>
                ) : order.status === 'CANCELED' ? (
                  <Text style={tailwind('text-base text-red-500')}>
                    Cancelado
                  </Text>
                ) : (
                  <>
                    <Image
                      resizeMode="contain"
                      style={tailwind('h-5 w-5')}
                      source={DeliverymanIcon}
                    />
                    {order.window && (
                      <Text style={tailwind('text-sm text-gray-800 ml-1')}>
                        {translateWeekDay(order.window.weekDay).replace(
                          '-feira',
                          '',
                        )}
                        , {order.window.startsAt.slice(0, 2)} -{' '}
                        {order.window.endsAt}hrs
                      </Text>
                    )}
                  </>
                )}
              </View>
            </View>
          </View>
          <View style={tailwind('items-end')}>
            <Text style={tailwind('text-sm font-medium text-primary-500')}>
              {formatPrice(order.total)}
            </Text>
          </View>
        </View>
        <View style={tailwind('items-center')}>
          <TouchableOpacity
            onPress={() => handleOpenHelpModal(order)}
            style={tailwind('py-1')}
          >
            <Text style={tailwind('text-lg font-medium text-primary-500')}>
              Preciso de ajuda
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableHighlight>
  )
}

RequestCard.displayName = 'RequestCard'

export default RequestCard
