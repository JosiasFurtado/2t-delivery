import React from 'react'
import { View, Image, Text } from 'react-native'
import { tailwind, getColor } from 'lib/styles'
import { Fontisto } from '@expo/vector-icons'
import Bakery from '../../../assets/icons/bakery.png'
import Address from '../../../assets/icons/address.png'
import Payment from '../../../assets/icons/payment.png'
import Money from '../../../assets/icons/money.png'
import { Order } from 'types/app'
import formatPrice from 'utils/formatPrice'
import translateWeekDay from 'utils/translateWeekDay'

interface RequestDetailItensProps {
  readonly order: Order
}

const RequestDetailItens: React.FC<RequestDetailItensProps> = ({ order }) => {
  return (
    <View style={tailwind('items-center')}>
      <Text style={tailwind('text-primary-500 text-xl mb-4')}>
        Informações do pedido
      </Text>
      <View
        style={tailwind(
          'flex-row items-center justify-start border border-gray-300 w-full rounded py-3 px-3 mb-2',
        )}
      >
        <Fontisto name="hashtag" size={27} color={getColor('primary-500')} />
        <View style={tailwind('ml-3')}>
          <Text style={tailwind('text-gray-700')}>Número do pedido:</Text>
          <Text style={tailwind('text-base')}>#{order.id}</Text>
        </View>
      </View>
      <View
        style={tailwind(
          'flex-row items-center justify-start border border-gray-300 w-full rounded py-3 px-3 mb-2',
        )}
      >
        <Fontisto
          name="shopping-store"
          size={27}
          color={getColor('primary-500')}
        />
        <View style={tailwind('ml-3 mr-4')}>
          <View style={tailwind('flex-row items-center')}>
            <Text style={tailwind('text-gray-700')}>Loja:</Text>
            <Text style={tailwind('text-sm text-gray-800 ml-2')}>
              {order.market.name}
            </Text>
          </View>
          <Text
            style={tailwind('text-base')}
          >{`${order.market.address.street}, ${order.market.address.number}, ${order.market.address.neighborhood}, ${order.market.address.city}`}</Text>
        </View>
      </View>
      {order.status === 'CANCELED' ? (
        <Text style={tailwind('text-red-500 text-lg py-8 pb-48')}>
          Cancelado
        </Text>
      ) : (
        <>
          <View
            style={tailwind(
              'flex-row items-center justify-start border border-gray-300 w-full rounded py-3 px-3 mb-2',
            )}
          >
            <Fontisto name="clock" size={30} color={getColor('primary-500')} />
            <View style={tailwind('ml-3')}>
              <Text style={tailwind('text-gray-700')}>
                Previsão de entrega:
              </Text>
              {order.window && (
                <Text style={tailwind('text-base')}>
                  {translateWeekDay(order.window.weekDay)} entre{' '}
                  {order.window.startsAt.slice(0, 2)} - {order.window.endsAt}hrs
                </Text>
              )}
            </View>
          </View>
          {order.isTakeOut ? (
            <View
              style={tailwind(
                'flex-row items-center justify-start border border-gray-300 w-full rounded py-3 px-3 mb-2',
              )}
            >
              <Image source={Bakery} style={tailwind('w-8 h-8')} />
              <View style={tailwind('ml-3')}>
                <Text style={tailwind('text-gray-700')}>Retirada:</Text>
                {order.window && (
                  <Text style={tailwind('text-base')}>
                    {translateWeekDay(order.window.weekDay)} entre{' '}
                    {order.window.startsAt.slice(0, 2)} - {order.window.endsAt}
                    hrs
                  </Text>
                )}
              </View>
            </View>
          ) : (
            <View
              style={tailwind(
                'flex-row items-center justify-start border border-gray-300 w-full rounded py-3 px-3 mb-2',
              )}
            >
              <Image source={Address} style={tailwind('w-8 h-8')} />
              <View style={tailwind('ml-3')}>
                <Text style={tailwind('text-gray-700')}>Receber em:</Text>
                <Text
                  style={tailwind('text-base mr-5')}
                >{`${order.address.street}, ${order.address.number}, ${order.address.neighborhood}, ${order.address.city}`}</Text>
              </View>
            </View>
          )}
          <View
            style={tailwind(
              'flex-row items-center justify-start border border-gray-300 w-full rounded py-3 px-3 mb-2',
            )}
          >
            <Image source={Payment} style={tailwind('w-8 h-8')} />
            <View style={tailwind('ml-3')}>
              <Text style={tailwind('text-gray-700')}>Pagamento:</Text>
              <Text style={tailwind('text-base')}>
                {order.isTakeOut ? 'Na retirada' : 'Na entrega'} -{' '}
                {order.paymentMethod.name}
              </Text>
            </View>
          </View>
          <View
            style={tailwind(
              'flex-row items-center justify-start border border-gray-300 w-full rounded py-3 px-3 mb-2',
            )}
          >
            <Image source={Money} style={tailwind('w-8 h-8')} />
            <View style={tailwind('ml-3')}>
              <Text style={tailwind('text-gray-700')}>Valor:</Text>
              <Text style={tailwind('text-base')}>
                {formatPrice(order.total)}
              </Text>
            </View>
          </View>
          {order.items && (
            <View
              style={tailwind(
                'flex-row items-center justify-start border border-gray-300 w-full rounded py-3 px-3 mb-2',
              )}
            >
              <View>
                <Text style={tailwind('text-gray-700')}>Produtos:</Text>
                <View>
                  {order.items.map(ord => (
                    <View
                      key={ord.id.toString()}
                      style={tailwind(
                        'flex-row mt-2 border-b border-gray-400 pb-2',
                      )}
                    >
                      <Image
                        source={{ uri: ord.product.imageUrl }}
                        style={tailwind('w-10 h-10 rounded-lg')}
                      />
                      <View style={tailwind('ml-2 text-base w-4/5')}>
                        <View style={tailwind('flex-row items-start')}>
                          <Text
                            style={tailwind('text-sm text-primary-600 mr-1')}
                          >
                            (x{ord.amount})
                          </Text>
                          <Text style={tailwind('text-base text-gray-800')}>
                            {ord.product.name}
                          </Text>
                        </View>
                        <Text style={tailwind('text-sm text-gray-800 mb-1')}>
                          {formatPrice(ord.product.price)}
                        </Text>
                        {ord.comment !== '' && (
                          <Text style={tailwind('text-sm text-gray-600')}>
                            {ord.comment}
                          </Text>
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}
        </>
      )}
    </View>
  )
}

RequestDetailItens.displayName = 'RequestDetailItens'

export default RequestDetailItens
