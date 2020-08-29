import React, { useState } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { tailwind } from 'lib/styles'
import RequestList from 'components/List/RequestList'
import RequestsModal from 'components/modals/Requests'

const storesMock = [
  { id: '0' },
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
]

const MyRequests: React.FC = () => {
  const [openModal, setOpenModal] = useState(false)

  const handleOpenHelpModal = () => {
    setOpenModal(true)
  }

  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-gray-50')}>
      <View style={tailwind('bg-primary-500 h-24 px-4 justify-center')}>
        <Text style={tailwind('text-white text-2xl')}>Seus pedidos, Jota</Text>
      </View>
      <View style={tailwind('-mt-4 rounded-t-xl bg-white px-3')}>
        <RequestList
          handleOpenHelpModal={handleOpenHelpModal}
          data={storesMock}
        />
      </View>
      <RequestsModal open={openModal} setOpenModal={setOpenModal} />
    </SafeAreaView>
  )
}

MyRequests.displayName = 'MyRequests'

export default MyRequests
