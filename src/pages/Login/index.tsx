import React, { useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native'
import { tailwind } from 'lib/styles'

import logo from '../../../assets/png/logo.png'
import bgImage from '../../../assets/png/bg-image.png'
import { LoginModals } from 'types/app'
import LoginModal from 'components/modals/LoginModal'

const Login: React.FC = () => {
  const [openModal, setOpenModal] = useState(false)
  const [typeModal, setTypeModal] = useState<LoginModals>('signin')

  const openSignUpModal = () => {
    setTypeModal('signup')
    setOpenModal(true)
  }

  const openSignInModal = () => {
    setTypeModal('signin')
    setOpenModal(true)
  }
  const openForgotMyPasswordModal = () => {
    setTypeModal('forgotMyPassword')
    setOpenModal(true)
  }

  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-white')}>
      <ImageBackground source={bgImage} style={tailwind('flex-1 w-full')}>
        <View style={tailwind('flex flex-1 items-center justify-center')}>
          <Image
            source={logo}
            resizeMode="contain"
            style={tailwind('h-48 w-2/4 my-16')}
          />
          <View style={tailwind('w-full flex items-center')}>
            <TouchableOpacity
              style={tailwind(
                'w-4/5 h-12 mb-4 bg-white-transparent rounded flex items-center justify-center',
              )}
              onPress={openSignInModal}
            >
              <Text style={tailwind('text-white text-lg font-medium')}>
                ENTRAR
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tailwind(
                'w-4/5 h-12 mb-8 bg-white-transparent bg-opacity-25 rounded flex items-center justify-center',
              )}
              onPress={openSignUpModal}
            >
              <Text style={tailwind('text-white text-lg font-medium')}>
                REGISTRAR
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openForgotMyPasswordModal}>
              <Text
                style={tailwind('text-white opacity-75 text-sm font-medium')}
              >
                Esqueci minha senha
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <LoginModal
          open={openModal}
          type={typeModal}
          setOpenModal={setOpenModal}
          setTypeModal={setTypeModal}
        />
      </ImageBackground>
    </SafeAreaView>
  )
}

Login.displayName = 'Login'

export default Login
