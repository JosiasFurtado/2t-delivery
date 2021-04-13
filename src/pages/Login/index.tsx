import React, { useEffect, useState } from 'react'
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
import { useNavigation } from '@react-navigation/native'
import Eyes from '../../../assets/icons/eyes.png'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/modules/rootReducer'
import { signInRequest } from 'store/modules/auth/actions'

interface LoginProps {
  readonly route: any
}
const Login: React.FC<LoginProps> = ({ route }) => {
  const newUserSignUp = route.params && route.params.fromVisitor
  const dispatch = useDispatch()
  const { user, activeAddressId } = useSelector(
    (state: RootState) => state.user,
  )
  const { navigate } = useNavigation()
  const [openModal, setOpenModal] = useState(false)
  const [typeModal, setTypeModal] = useState<LoginModals>('signin')

  useEffect(() => {
    if (user && user.firstName === 'Visitante') {
      navigate('VisitorInitialAddress')
      return
    }
    if (user && activeAddressId) {
      setOpenModal(false)
      navigate('Home')
      return
    }
    if (user && !activeAddressId) {
      setOpenModal(false)
      navigate('InitialAddress')
    }
    if (newUserSignUp) {
      openSignUpModal()
    }
  }, [user, activeAddressId])

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

  const handleSetVisitorAndNavigateToAddress = () => {
    const data = {
      email: 'visitante@visitante.com',
      password: '123456',
    }
    dispatch(signInRequest(data))
    navigate('VisitorInitialAddress')
  }

  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-primary-500')}>
      <ImageBackground source={bgImage} style={tailwind('flex-1 w-full')}>
        <View style={tailwind('flex-1 items-center justify-center')}>
          <Image
            source={logo}
            resizeMode="contain"
            style={tailwind('h-48 w-2/4 my-16')}
          />
          <View style={tailwind('w-full items-center')}>
            <TouchableOpacity
              style={tailwind(
                'w-4/5 h-12 mb-4 bg-white-transparent rounded items-center justify-center',
              )}
              onPress={openSignInModal}
            >
              <Text style={tailwind('text-white text-lg font-medium')}>
                ENTRAR
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tailwind(
                'w-4/5 h-12 mb-8 bg-white-transparent bg-opacity-25 rounded items-center justify-center',
              )}
              onPress={openSignUpModal}
            >
              <Text style={tailwind('text-white text-lg font-medium')}>
                REGISTRAR
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openForgotMyPasswordModal}
              style={tailwind('mb-6')}
            >
              <Text
                style={tailwind('text-white opacity-75 text-sm font-medium')}
              >
                Esqueci minha senha
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSetVisitorAndNavigateToAddress}
              style={tailwind('flex-row items-center')}
            >
              <Text
                style={tailwind(
                  'text-white opacity-75 text-sm font-medium mr-2',
                )}
              >
                Só quero olhar
              </Text>
              <Image
                source={Eyes}
                style={tailwind('w-6 h-6 opacity-75')}
                resizeMethod="resize"
              />
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
