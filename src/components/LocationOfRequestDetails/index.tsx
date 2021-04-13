import React from 'react'
import { StyleProp, Text, View, ViewStyle, Image } from 'react-native'
import { tailwind, getColor } from 'lib/styles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Deliveryman from '../../../assets/png/deliveryman-icon-color.png'
import { Order } from 'types/app'
import moment from 'moment'

interface LocationOfRequestDetailsProps {
  readonly style?: StyleProp<ViewStyle>
  readonly order: Order
}

const LocationOfRequestDetails: React.FC<LocationOfRequestDetailsProps> = ({
  style,
  order
}) => {
  moment().locale('pt-br')
  return (
    <View
      style={[
        tailwind('border border-gray-300 rounded flex-row items-center py-1'),
        style,
      ]}
    >
      <View style={tailwind('px-4 h-full items-center')}>
        <MaterialCommunityIcons
          name="clock"
          size={20}
          color={getColor('primary-500')}
          style={tailwind('pt-2')}
        />
        <View
          style={[
            tailwind('h-8 w-px'),
            {
              borderStyle: 'dashed',
              borderWidth: 1,
              borderColor: '#007B43',
              borderRadius: 1,
            },
          ]}
        />
        <MaterialCommunityIcons
          name="check-all"
          size={20}
          color={getColor('primary-500')}
        />
        <View
          style={[
            tailwind('h-8 w-px'),
            {
              borderStyle: 'dashed',
              borderWidth: 1,
              borderColor: '#007B43',
              borderRadius: 1,
            },
          ]}
        />
        <Image
          source={Deliveryman}
          resizeMode="contain"
          style={tailwind('w-6 h-6')}
        />
      </View>
      <View>
        <View style={tailwind('mb-2')}>
          <Text style={tailwind('text-lg text-gray-700')}>
            Pedido realizado
          </Text>
          <View style={tailwind('flex-row items-center')}>
            <MaterialCommunityIcons name="clock" size={18} color="black" />
            <Text style={tailwind('ml-1 text-base font-bold')}>{moment(order.createdAt).format('LT')}</Text>
          </View>
        </View>
        <View style={tailwind('mb-2')}>
          <Text style={tailwind('text-lg text-gray-700')}>Pedido aceito</Text>
          <View style={tailwind('flex-row items-center')}>
            <MaterialCommunityIcons name="clock" size={18} color="black" />
        <Text style={tailwind('ml-1 text-base font-bold')}>{order.seenAt ? moment(order.seenAt).format('LT') : 'Aguardando'}</Text>
          </View>
        </View>
        <View style={tailwind('mb-2')}>
          <Text style={tailwind('text-lg text-gray-700')}>
            {order.isTakeOut ? "Pronto para retirada" : "Pronto para entrega"}
          </Text>
          <View style={tailwind('flex-row items-center')}>
            <MaterialCommunityIcons name="clock" size={18} color="black" />
            <Text style={tailwind('ml-1 text-base font-bold')}>{order.readyAt ? moment(order.readyAt).format('LT') : 'Aguardando'}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

LocationOfRequestDetails.displayName = 'LocationOfRequestDetails'

export default LocationOfRequestDetails
