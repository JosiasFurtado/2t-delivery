import React from 'react'
import { StyleProp, View, SafeAreaView, ViewStyle, Text } from 'react-native'
import { tailwind } from 'lib/styles'
import TutorialCarousel from 'components/TutorialCarousel'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

interface TutorialProps {
  readonly style?: StyleProp<ViewStyle>
  readonly route: any
}

const Tutorial: React.FC<TutorialProps> = ({ route }) => {
  const fromProfile = route.params && route.params.fromProfile
  const { navigate } = useNavigation()
  const handleNavigate = () => {
    if (fromProfile) {
      return navigate('Profile')
    }
    return navigate('Login')
  }

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
