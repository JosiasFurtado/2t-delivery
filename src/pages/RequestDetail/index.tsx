import React, { useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { tailwind } from 'lib/styles'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import RequestsModal from 'components/modals/Requests'
import RequestDetailItens from 'components/RequestDetailItens'
import LocationOfRequestDetails from 'components/LocationOfRequestDetails'
import { Order } from 'types/app'

interface RequestDetailProps {
  readonly route: {
    params: {
      order: Order
    }
  }
}

const RequestDetail: React.FC<RequestDetailProps> = ({route}) => {
  const { order } = route.params
  const { goBack } = useNavigation()
  const [openModal, setOpenModal] = useState(false)

  const handleOpenHelpModal = () => {
    setOpenModal(true)
  }

  const handleCancelOrder = () => {
    // Add feature
  }

  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-primary-500')}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={tailwind(
            'bg-primary-500 flex-row -mt-4 h-32 px-4 items-center justify-between',
          )}
        >
          <View style={tailwind('flex-row items-center')}>
            <TouchableOpacity onPress={() => goBack()} style={tailwind('py-2')}>
              <Ionicons name="md-arrow-back" size={35} color="#fff" />
            </TouchableOpacity>
            <Text style={tailwind('text-white text-xl ml-3')}>
              Onde está meu pedido?
            </Text>
          </View>
          <TouchableOpacity onPress={handleOpenHelpModal}>
            <Text style={tailwind('text-white font-bold text-xl')}>Ajuda</Text>
          </TouchableOpacity>
        </View>
        <View style={tailwind('-mt-4 rounded-t-xl bg-white px-4 pt-4')}>
          <LocationOfRequestDetails order={order} style={tailwind('mb-4')} />
          <RequestDetailItens order={order} />
          {order.status !== 'CANCELED' && (
          <TouchableOpacity
          onPress={handleCancelOrder}
            style={tailwind('mb-4 bg-gray-200 items-center rounded py-3')}
          >
            <Text style={tailwind('text-base text-gray-500')}>
              Cancelar pedido
            </Text>
          </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <RequestsModal order={order} open={openModal} setOpenModal={setOpenModal} />
    </SafeAreaView>
  )
}

RequestDetail.displayName = 'RequestDetail'

export default RequestDetail
