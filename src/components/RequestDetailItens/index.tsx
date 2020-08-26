import React from 'react'
import { View, Image, Text, ScrollView } from 'react-native'
import { tailwind, getColor } from 'lib/styles'
import { Fontisto } from '@expo/vector-icons'
import Bakery from '../../../assets/icons/bakery.png'
import Address from '../../../assets/icons/address.png'
import Payment from '../../../assets/icons/payment.png'
import Money from '../../../assets/icons/money.png'

interface RequestDetailItensProps {}

const RequestDetailItens: React.FC<RequestDetailItensProps> = () => {
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
          <Text style={tailwind('text-base')}>#00001</Text>
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
        <View style={tailwind('ml-3')}>
          <View style={tailwind('flex-row items-center')}>
            <Text style={tailwind('text-gray-700')}>Loja:</Text>
            <Text style={tailwind('text-base ml-2')}>FreshMarket</Text>
          </View>
          <Text style={tailwind('text-base')}>Rua Lorem Ipsum, 42, SP</Text>
        </View>
      </View>
      <View
        style={tailwind(
          'flex-row items-center justify-start border border-gray-300 w-full rounded py-3 px-3 mb-2',
        )}
      >
        <Fontisto name="clock" size={30} color={getColor('primary-500')} />
        <View style={tailwind('ml-3')}>
          <Text style={tailwind('text-gray-700')}>Previsão de entrega:</Text>
          <Text style={tailwind('text-base')}>Dia 30/08, entre 14h - 16h</Text>
        </View>
      </View>
      <View
        style={tailwind(
          'flex-row items-center justify-start border border-gray-300 w-full rounded py-3 px-3 mb-2',
        )}
      >
        <Image source={Bakery} style={tailwind('w-8 h-8')} />
        <View style={tailwind('ml-3')}>
          <Text style={tailwind('text-gray-700')}>Retirada:</Text>
          <Text style={tailwind('text-base')}>Dia 30/08 às 8h</Text>
        </View>
      </View>
      <View
        style={tailwind(
          'flex-row items-center justify-start border border-gray-300 w-full rounded py-3 px-3 mb-2',
        )}
      >
        <Image source={Address} style={tailwind('w-8 h-8')} />
        <View style={tailwind('ml-3')}>
          <Text style={tailwind('text-gray-700')}>Receber em:</Text>
          <Text style={tailwind('text-base')}>Rua Lorem Ipsum, 42, SP</Text>
        </View>
      </View>
      <View
        style={tailwind(
          'flex-row items-center justify-start border border-gray-300 w-full rounded py-3 px-3 mb-2',
        )}
      >
        <Image source={Payment} style={tailwind('w-8 h-8')} />
        <View style={tailwind('ml-3')}>
          <Text style={tailwind('text-gray-700')}>Pagamento:</Text>
          <Text style={tailwind('text-base')}>Na entrega - dinheiro</Text>
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
          <Text style={tailwind('text-base')}>R$ 250,00</Text>
        </View>
      </View>
    </View>
  )
}

RequestDetailItens.displayName = 'RequestDetailItens'

export default RequestDetailItens
