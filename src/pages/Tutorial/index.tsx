import React, { useEffect } from 'react'
import { StyleProp, View, SafeAreaView, ViewStyle, Text } from 'react-native'
import { tailwind } from 'lib/styles'
import TutorialCarousel from 'components/TutorialCarousel'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/modules/rootReducer'
import { updateUserAddresses } from 'store/modules/user/actions'

interface TutorialProps {
  readonly style?: StyleProp<ViewStyle>
  readonly route: any
}

const Tutorial: React.FC<TutorialProps> = ({ route }) => {
  const dispatch = useDispatch()
  const { user, activeAddressId } = useSelector((state: RootState) => state.user)
  const fromProfile = route.params && route.params.fromProfile
  const { navigate, goBack } = useNavigation()
  const handleNavigate = () => {
    if (fromProfile) {
      return goBack()
    }
    return navigate('Login')
  }

  useEffect(() => {
    if (user && activeAddressId && !fromProfile) {
      dispatch(updateUserAddresses(user.id))
      navigate('Home')
    }
    if (user && !activeAddressId && !fromProfile) {
      navigate('InitialAddress')
    }
  }, [user, activeAddressId])

  return (
    <SafeAreaView style={tailwind('flex-1 relative bg-white')}>
      <View style={tailwind('py-4 flex-1')}>
        <Text style={tailwind('text-center text-primary-500 text-3xl mt-4')}>
          Tutorial
        </Text>
        <TutorialCarousel />
        <View style={tailwind('items-center')}>
          <TouchableOpacity onPress={handleNavigate}>
            <Ionicons
              name="ios-close-circle-outline"
              size={35}
              color="#4d4d4d"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

Tutorial.displayName = 'Tutorial'

export default Tutorial
