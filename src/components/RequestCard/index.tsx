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

interface RequestCardProps {
  readonly style?: StyleProp<ViewStyle>
  handleOpenHelpModal(): void
}

const RequestCard: React.FC<RequestCardProps> = ({
  style,
  handleOpenHelpModal,
}) => {
  const { navigate } = useNavigation()
  return (
    <TouchableHighlight
      style={[tailwind('shadow-md rounded-xl bg-white px-2 py-2'), style]}
      underlayColor={getColor('gray-100')}
      onPress={() => navigate('RequestDetail')}
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
              source={{
                uri:
                  'https://image.freepik.com/vetores-gratis/logotipo-da-empresa-de-negocios-de-mercado-fresco_23-2148462395.jpg',
              }}
            />

            <View style={tailwind('ml-2')}>
              <Text style={tailwind('text-base font-bold text-gray-800')}>
                FreshMarket - #00001
              </Text>
              <View style={tailwind('flex-row items-center mb-2')}>
                <View style={tailwind('flex-row items-center')}>
                  <Ionicons
                    name="md-list-box"
                    size={16}
                    color={getColor('gray-600')}
                  />
                  <Text style={tailwind('text-gray-700 text-base ml-1')}>
                    12:09h
                  </Text>
                </View>
                <View style={tailwind('flex-row items-center ml-4')}>
                  <Ionicons
                    name="md-calendar"
                    size={16}
                    color={getColor('gray-600')}
                  />
                  <Text style={tailwind('text-gray-700 text-base ml-1')}>
                    23/08/2020
                  </Text>
                </View>
              </View>
              <View style={tailwind('flex-row items-center')}>
                <Image
                  resizeMode="contain"
                  style={tailwind('h-5 w-5')}
                  source={DeliverymanIcon}
                />
                <Text style={tailwind('text-base text-gray-800 ml-1')}>
                  Hoje, 12:00 hrs
                </Text>
              </View>
            </View>
          </View>
          <View style={tailwind('items-end')}>
            <Text style={tailwind('text-lg font-medium text-primary-500')}>
              R$ 89,99
            </Text>
          </View>
        </View>
        <View style={tailwind('items-center')}>
          <TouchableOpacity
            onPress={() => handleOpenHelpModal()}
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
