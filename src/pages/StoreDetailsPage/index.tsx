import React, { useMemo } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native'
import { tailwind, getColor } from 'lib/styles'
import { useNavigation } from '@react-navigation/native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import BgStore from '../../../assets/png/bg-store.png'
import DeliverymanGreenIcon from '../../../assets/png/deliveryman-icon-color.png'
import DeliverymanRedIcon from '../../../assets/png/deliveryman-icon-red.png'
import { MarketWithCategories } from 'types/app'
import formatPrice from 'utils/formatPrice'
import useMarketDetails from 'utils/useMarketDetails'

interface StoreDetailsPageProps {
  readonly route: {
    params: {
      market: MarketWithCategories
    }
  }
}

const StoreDetailsPage: React.FC<StoreDetailsPageProps> = ({ route }) => {
  const { market } = route.params
  const { goBack } = useNavigation()
  const [{ payments }] = useMarketDetails(market.id)

  const tax = useMemo(() => {
    if (
      market &&
      market.deliveryRanges[0] &&
      market.distanceBetweenUser <= market.deliveryRanges[0].endsAt
    ) {
      return market.deliveryRanges[0].price
    }
    if (
      market &&
      market.deliveryRanges[1] &&
      market.distanceBetweenUser <= market.deliveryRanges[1].endsAt
    ) {
      return market.deliveryRanges[1].price
    }
    if (
      market &&
      market.deliveryRanges[2] &&
      market.distanceBetweenUser <= market.deliveryRanges[2].endsAt
    ) {
      return market.deliveryRanges[2].price
    }
    if (
      market &&
      market.deliveryRanges[3] &&
      market.distanceBetweenUser <= market.deliveryRanges[3].endsAt
    ) {
      return market.deliveryRanges[3].price
    }
    if (
      market &&
      market.deliveryRanges[4] &&
      market.distanceBetweenUser <= market.deliveryRanges[4].endsAt
    ) {
      return market.deliveryRanges[4].price
    }
    return '10.00'
  }, [market, market?.distanceBetweenUser])

  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-primary-500')}>
      <ScrollView style={tailwind('bg-gray-50')}>
        <ImageBackground
          source={market.imageUrl ? { uri: market.imageUrl } : BgStore}
          resizeMode="cover"
          borderBottomLeftRadius={28}
          borderBottomRightRadius={28}
          style={tailwind('w-full h-full h-48')}
        >
          <TouchableOpacity
            onPress={() => goBack()}
            style={tailwind('px-4 py-4')}
          >
            <Ionicons name="md-arrow-back" size={35} color="#fff" />
          </TouchableOpacity>
        </ImageBackground>
        <View style={tailwind('px-6 pb-2')}>
          <View
            style={tailwind(
              'bg-white -mt-16 px-2 py-2 mb-4 shadow-md rounded-lg',
            )}
          >
            <View style={tailwind('flex-row mb-2')}>
              <Image
                style={[
                  tailwind('w-16 h-16 rounded-lg'),
                  { borderColor: '#edf2f7', borderWidth: 2 },
                ]}
                resizeMode="cover"
                source={
                  market.imageUrl
                    ? { uri: market.imageUrl }
                    : {
                        uri:
                          'https://image.freepik.com/vetores-gratis/logotipo-da-empresa-de-negocios-de-mercado-fresco_23-2148462395.jpg',
                      }
                }
              />
              <View style={tailwind('ml-2')}>
                <Text style={tailwind('text-xl mb-1 w-4/5')}>
                  {market.name}
                </Text>
                <View style={tailwind('flex-row items-center')}>
                  <MaterialIcons
                    name="my-location"
                    size={18}
                    color={getColor('primary-500')}
                  />
                  <Text style={tailwind('text-gray-700 ml-1')}>
                    {market.distanceBetweenUser} Km
                  </Text>
                </View>
              </View>
            </View>
            <View style={tailwind('flex-row items-center')}>
              <Image
                resizeMode="contain"
                style={tailwind('h-5 w-5')}
                source={
                  market.delivery ? DeliverymanGreenIcon : DeliverymanRedIcon
                }
              />
              <Text
                style={tailwind(
                  `text-base ml-1 ${
                    market.delivery ? 'text-gray-700' : 'text-red-600 '
                  }`,
                )}
              >
                {market.delivery ? 'Faz entregas' : 'Só aceita retiradas'}
              </Text>
            </View>
          </View>
        </View>
        <View style={tailwind('items-center')}>
          <View style={tailwind('w-1/3 items-center bg-white rounded-lg mb-4')}>
            <View
              style={tailwind('border-b border-primary-500 py-3 items-center')}
            >
              <Text style={tailwind('text-primary-500 text-lg')}>
                Informações
              </Text>
            </View>
          </View>
          {market.bio && (
            <View
              style={tailwind(
                'bg-white px-6 py-2 w-full rounded-2xl shadow-md mb-6',
              )}
            >
              <Text style={tailwind('text-2xl text-center mb-2')}>
                Sobre nós
              </Text>
              <Text
                style={tailwind('text-base text-gray-700 text-justify mb-3')}
              >
                {market.bio}
              </Text>
            </View>
          )}
          <View
            style={tailwind(
              'bg-white px-6 py-2 w-full rounded-2xl shadow-md mb-6',
            )}
          >
            <Text style={tailwind('text-2xl text-center mb-2')}>Detalhes</Text>
            <View style={tailwind('items-center')}>
              <Text style={tailwind('text-base text-gray-700')}>
                Taxa de entrega
              </Text>
              <Text style={tailwind('text-lg text-primary-500 mb-2')}>
                {formatPrice(tax)}
              </Text>
              <Text style={tailwind('text-base text-gray-700')}>
                Valor mínimo
              </Text>
              <Text style={tailwind('text-lg text-primary-500 mb-2')}>
                {formatPrice(market.minimalPrice)}
              </Text>
              {market.phones &&
                market.phones.map(tel => (
                  <View key={tel.type}>
                    <Text
                      style={tailwind('text-base text-center text-gray-700')}
                    >
                      {tel.type.includes('WHATS') ? 'Whatsapp' : 'Telefone'}
                    </Text>
                    <Text
                      style={tailwind(
                        'text-lg text-center text-primary-500 mb-2',
                      )}
                    >
                      {tel.number}
                    </Text>
                  </View>
                ))}
              <Text style={tailwind('text-base text-gray-700')}>Email</Text>
              <Text style={tailwind('text-lg text-primary-500 mb-2')}>
                {market.email && market.email}
              </Text>
            </View>
          </View>
          <View
            style={tailwind(
              'bg-white px-6 py-2 w-full rounded-2xl shadow-md mb-6',
            )}
          >
            <Text style={tailwind('text-2xl text-center mb-2')}>
              Horários de funcionamento
            </Text>
            <View style={tailwind('items-center')}>
              {market.schedule.monday.startsAt !== '' && (
                <>
                  <Text style={tailwind('text-base text-gray-700')}>
                    Segunda-feira
                  </Text>
                  <Text style={tailwind('text-lg text-primary-500 mb-2')}>
                    {market.schedule.monday.startsAt}h -{' '}
                    {market.schedule.monday.endsAt}h
                  </Text>
                </>
              )}
              {market.schedule.tuesday.startsAt !== '' && (
                <>
                  <Text style={tailwind('text-base text-gray-700')}>
                    Terça-feira
                  </Text>
                  <Text style={tailwind('text-lg text-primary-500 mb-2')}>
                    {market.schedule.tuesday.startsAt}h -{' '}
                    {market.schedule.tuesday.endsAt}h
                  </Text>
                </>
              )}
              {market.schedule.wednesday.startsAt !== '' && (
                <>
                  <Text style={tailwind('text-base text-gray-700')}>
                    Quarta-feira
                  </Text>
                  <Text style={tailwind('text-lg text-primary-500 mb-2')}>
                    {market.schedule.wednesday.startsAt}h -{' '}
                    {market.schedule.wednesday.endsAt}h
                  </Text>
                </>
              )}
              {market.schedule.thursday.startsAt !== '' && (
                <>
                  <Text style={tailwind('text-base text-gray-700')}>
                    Quinta-feira
                  </Text>
                  <Text style={tailwind('text-lg text-primary-500 mb-2')}>
                    {market.schedule.thursday.startsAt}h -{' '}
                    {market.schedule.thursday.endsAt}h
                  </Text>
                </>
              )}
              {market.schedule.friday.startsAt !== '' && (
                <>
                  <Text style={tailwind('text-base text-gray-700')}>
                    Sexta-feira
                  </Text>
                  <Text style={tailwind('text-lg text-primary-500 mb-2')}>
                    {market.schedule.friday.startsAt}h -{' '}
                    {market.schedule.friday.endsAt}h
                  </Text>
                </>
              )}
              {market.schedule.saturday.startsAt !== '' && (
                <>
                  <Text style={tailwind('text-base text-gray-700')}>
                    Sabados
                  </Text>
                  <Text style={tailwind('text-lg text-primary-500 mb-2')}>
                    {market.schedule.saturday.startsAt}h -{' '}
                    {market.schedule.saturday.endsAt}h
                  </Text>
                </>
              )}
              {market.schedule.sunday.startsAt !== '' && (
                <>
                  <Text style={tailwind('text-base text-gray-700')}>
                    Domingos e feriados
                  </Text>
                  <Text style={tailwind('text-lg text-primary-500 mb-2')}>
                    {market.schedule.sunday.startsAt}h -{' '}
                    {market.schedule.sunday.endsAt}h
                  </Text>
                </>
              )}
            </View>
          </View>
          {payments && payments[0] && (
            <View
              style={tailwind(
                'bg-white px-6 py-2 w-full rounded-2xl shadow-md mb-4',
              )}
            >
              <Text style={tailwind('text-2xl text-center mb-2')}>
                Métodos de pagamento
              </Text>
              <View style={tailwind('items-center')}>
                {payments?.map(payment => (
                  <View key={payment.name}>
                    <Text
                      style={tailwind(
                        'text-base text-gray-700 mb-2 text-center',
                      )}
                    >
                      {payment.name}
                    </Text>
                    <View style={tailwind('flex-row mb-4 justify-center')}>
                      {payment.methods.map(met => (
                        <View key={met.name} style={tailwind('flex-row')}>
                          <Text style={tailwind('mr-1 ml-1')}>•</Text>
                          <Text>{met.name}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

StoreDetailsPage.displayName = 'StoreDetailsPage'

export default StoreDetailsPage
