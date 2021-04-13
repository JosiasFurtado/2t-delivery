import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { tailwind, getColor } from 'lib/styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons, Feather, Octicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import ProfileModal from 'components/modals/Profile'
import { ProfileModals } from 'types/app'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from 'store/modules/auth/actions'
import { RootState } from 'store/modules/rootReducer'

const Profile: React.FC = () => {
  const dispatch = useDispatch()
  const { user, addresses, activeAddressId } = useSelector(
    (state: RootState) => state.user,
  )
  const { navigate } = useNavigation()
  const [openModal, setOpenModal] = useState(false)
  const [typeModal, setTypeModal] = useState<ProfileModals>('address')

  const activeAdress = addresses?.find(
    address => address.id === activeAddressId,
  )

  const handleSignOut = () => {
    dispatch(signOut())
    navigate('Login')
  }
  const openAddressModal = () => {
    setTypeModal('address')
    setOpenModal(true)
  }
  const openHelpModal = () => {
    setTypeModal('help')
    setOpenModal(true)
  }
  const openConfigModal = () => {
    if (user?.firstName === 'Visitante') {
      return
    }
    setTypeModal('config')
    setOpenModal(true)
  }

  return (
    <SafeAreaView
      style={tailwind('flex-1 relative justify-between bg-primary-500')}
    >
      <ScrollView style={tailwind('bg-white')}>
        <View style={tailwind('items-center pt-8 bg-white mb-4')}>
          <Text style={tailwind('text-gray-800 font-bold text-2xl mb-4')}>
            Perfil
          </Text>
          <View
            style={tailwind(
              'bg-primary-500 w-32 h-32 rounded-full items-center justify-center mb-4',
            )}
          >
            <Text style={tailwind('text-white text-6xl font-bold uppercase')}>
              {user?.firstName.charAt(0)}
            </Text>
          </View>
          <Text style={tailwind('text-gray-800 font-bold text-2xl mb-2')}>
            {user?.firstName}
          </Text>
          <View style={tailwind('flex-row items-center mb-4')}>
            <Octicons name="location" size={18} color={getColor('gray-700')} />
            <Text
              numberOfLines={1}
              lineBreakMode="tail"
              style={tailwind('ml-1 text-gray-700 text-base font-medium pr-2')}
            >
              {activeAdress && `${activeAdress.city}, ${activeAdress.state}`}
            </Text>
          </View>
          <View style={tailwind('w-1/3 items-center bg-gray-50 rounded-lg')}>
            <TouchableOpacity
              onPress={openConfigModal}
              style={tailwind('border-b border-primary-500 py-3 items-center')}
            >
              <Text style={tailwind('text-primary-500 text-lg')}>
                Configurações
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={tailwind('px-4')}>
          <TouchableOpacity
            onPress={openAddressModal}
            style={[
              tailwind('flex-row py-2 px-1 mb-2'),
              { borderColor: '#edf2f7', borderBottomWidth: 1 },
            ]}
          >
            <Octicons
              name="location"
              size={23}
              color={getColor('primary-500')}
              style={tailwind('ml-1')}
            />
            <Text style={tailwind('text-lg text-gray-700 ml-3')}>Endereço</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate('Tutorial', { fromProfile: true })}
            style={[
              tailwind('flex-row py-2 px-1 mb-2'),
              { borderColor: '#edf2f7', borderBottomWidth: 1 },
            ]}
          >
            <Feather name="compass" size={24} color={getColor('primary-500')} />
            <Text style={tailwind('text-lg text-gray-700 ml-2')}>Tutorial</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openHelpModal}
            style={[
              tailwind('flex-row py-2 px-1 mb-2'),
              { borderColor: '#edf2f7', borderBottomWidth: 1 },
            ]}
          >
            <Ionicons
              name="ios-help-buoy"
              size={24}
              color={getColor('primary-500')}
              style={tailwind('ml-1')}
            />
            <Text style={tailwind('text-lg text-gray-700 ml-2')}>Ajuda</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={tailwind('items-center bg-white')}>
        <TouchableOpacity
          onPress={handleSignOut}
          style={tailwind(
            'flex-row bg-primary-500 items-center justify-center py-1 w-32 rounded',
          )}
        >
          <Text style={tailwind('text-lg font-medium text-white')}>Sair</Text>
          <Ionicons
            name="ios-power"
            size={24}
            color="#fff"
            style={tailwind('ml-2')}
          />
        </TouchableOpacity>
      </View>
      <ProfileModal
        open={openModal}
        setOpenModal={setOpenModal}
        setTypeModal={setTypeModal}
        type={typeModal}
      />
    </SafeAreaView>
  )
}

Profile.displayName = 'Profile'

export default Profile
