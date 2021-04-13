import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { tailwind } from 'lib/styles'
import RequestList from 'components/List/RequestList'
import RequestsModal from 'components/modals/Requests'
import { useSelector } from 'react-redux'
import { RootState } from 'store/modules/rootReducer'
import api from 'services/api'
import { Order } from 'types/app'

interface MyRequestsProps {
  navigation: any
}

const MyRequests: React.FC<MyRequestsProps> = ({ navigation }) => {
  const [openModal, setOpenModal] = useState(false)
  const [refetch, setRefetch] = useState(false)
  const { user } = useSelector((state: RootState) => state.user)
  const [orders, setOrders] = useState<Order[] | undefined>()
  const [order, setOrder] = useState<Order | undefined>()

  useEffect(() => {
    async function getUserOrders() {
      const response = await api.get(`/user/${user?.id}/order`)
      setOrders(response.data.orders)
    }
    navigation.addListener('focus', () => {
      if (user) {
        getUserOrders()
      }
    })
  }, [refetch])

  const handleOpenHelpModal = (orderHelp: Order) => {
    setOrder(orderHelp)
    setOpenModal(true)
  }

  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-primary-500')}>
      <View style={tailwind('bg-primary-500 h-24 px-4 justify-center')}>
        <Text style={tailwind('text-white text-2xl')}>
          Seus pedidos, {user?.firstName}
        </Text>
      </View>
      <View style={tailwind('-mt-4 rounded-t-xl bg-white px-3 flex-1')}>
        {orders && orders[0] ? (
          <RequestList
            handleOpenHelpModal={handleOpenHelpModal}
            setRefetch={setRefetch}
            refetch={refetch}
            data={orders}
          />
        ) : (
          <View>
            <Text style={tailwind('text-center text-lg py-6')}>
              {user?.firstName === 'Visitante'
                ? 'Cadastre-se para fazer pedidos'
                : 'Você não tem pedidos'}
            </Text>
          </View>
        )}
      </View>
      <RequestsModal
        order={order}
        open={openModal}
        setOpenModal={setOpenModal}
      />
    </SafeAreaView>
  )
}

MyRequests.displayName = 'MyRequests'

export default MyRequests
