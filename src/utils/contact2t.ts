import Constants from 'expo-constants'
import { Linking } from 'react-native'

const handleDirectToContact2T = () => {
  Linking.canOpenURL('whatsapp://send?text=oi').then(supported => {
    if (supported) {
      return Linking.openURL(
        `whatsapp://send?phone=${Constants.manifest.extra.EXPO_2T_CONTACT}&text=${Constants.manifest.extra.EXPO_MSG_TO_CONTACT}`,
      )
    }
    return Linking.openURL(
      `https://api.whatsapp.com/send?phone=${Constants.manifest.extra.EXPO_2T_CONTACT}&text=${Constants.manifest.extra.EXPO_MSG_TO_CONTACT}`,
    )
  })
}

export default handleDirectToContact2T
