import React from 'react'
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

interface StoreDetailsPageProps {}

const StoreDetailsPage: React.FC<StoreDetailsPageProps> = () => {
  const { goBack } = useNavigation()

  const makesDeliveriesInTheArea = true

  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-gray-50')}>
      <ScrollView>
        <ImageBackground
          source={BgStore}
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
                source={{
                  uri:
                    'https://image.freepik.com/vetores-gratis/logotipo-da-empresa-de-negocios-de-mercado-fresco_23-2148462395.jpg',
                }}
              />
              <View style={tailwind('ml-2')}>
                <Text style={tailwind('text-xl mb-1')}>FreshMarket</Text>
                <View style={tailwind('flex-row items-center')}>
                  <MaterialIcons
                    name="my-location"
                    size={18}
                    color={getColor('primary-500')}
                  />
                  <Text style={tailwind('text-gray-700 ml-1')}>2.5 Km</Text>
                </View>
              </View>
            </View>
            <View style={tailwind('flex-row items-center')}>
              <Image
                resizeMode="contain"
                style={tailwind('h-5 w-5')}
                source={
                  makesDeliveriesInTheArea
                    ? DeliverymanGreenIcon
                    : DeliverymanRedIcon
                }
              />
              <Text
                style={tailwind(
                  `text-base ml-1 ${
                    makesDeliveriesInTheArea ? 'text-gray-700' : 'text-red-600 '
                  }`,
                )}
              >
                {makesDeliveriesInTheArea
                  ? 'Faz entregas na sua área'
                  : 'Só aceita retirada na sua área'}
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
          <View
            style={tailwind(
              'bg-white px-6 py-2 w-full rounded-2xl shadow-md mb-6',
            )}
          >
            <Text style={tailwind('text-2xl text-center mb-2')}>Sobre nós</Text>
            <Text style={tailwind('text-base text-gray-700 text-justify mb-3')}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              lacinia interdum ultricies. Vivamus quis tempor nibh. Nullam et
              lorem id eros congue maximus a id risus. Morbi a vehicula neque,
              sed pellentesque neque. Etiam tempus sollicitudin purus non
              scelerisque. Vestibulum nec porttitor lorem. Suspendisse mauris
              ipsum, mattis quis orci eu, pretium rhoncus elit.
            </Text>
          </View>
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
                R$ 10,00
              </Text>
              <Text style={tailwind('text-base text-gray-700')}>
                Valor mínimo
              </Text>
              <Text style={tailwind('text-lg text-primary-500 mb-2')}>
                R$ 50,00
              </Text>
              <Text style={tailwind('text-base text-gray-700')}>Telefone</Text>
              <Text style={tailwind('text-lg text-primary-500 mb-2')}>
                (11) 90000-0000
              </Text>
              <Text style={tailwind('text-base text-gray-700')}>Email</Text>
              <Text style={tailwind('text-lg text-primary-500 mb-2')}>
                contato@store.com
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
              <Text style={tailwind('text-base text-gray-700')}>
                Segunda a sexta
              </Text>
              <Text style={tailwind('text-lg text-primary-500 mb-2')}>
                08:00 - 22:00h
              </Text>
              <Text style={tailwind('text-base text-gray-700')}>Sabados</Text>
              <Text style={tailwind('text-lg text-primary-500 mb-2')}>
                10:00 - 20:00h
              </Text>
              <Text style={tailwind('text-base text-gray-700')}>
                Domingos e feriados
              </Text>
              <Text style={tailwind('text-lg text-primary-500 mb-2')}>
                10:00 - 18:00h
              </Text>
            </View>
          </View>
          <View
            style={tailwind(
              'bg-white px-6 py-2 w-full rounded-2xl shadow-md mb-4',
            )}
          >
            <Text style={tailwind('text-2xl text-center mb-2')}>
              Métodos de pagamento
            </Text>
            <View style={tailwind('items-center')}>
              <Text style={tailwind('text-base text-gray-700 mb-2')}>
                Cartões de crédito e débito
              </Text>
              <Text style={tailwind('text-base text-gray-700 mb-2')}>
                Vale-alimentação
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

StoreDetailsPage.displayName = 'StoreDetailsPage'

export default StoreDetailsPage
