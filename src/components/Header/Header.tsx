import React from 'react'
import {
  StyleProp,
  View,
  ViewStyle,
  Image,
  TouchableOpacity,
} from 'react-native'
import { tailwind } from 'lib/styles'
import AddressChanger from './AddressChanger'
import Logo from '../../../assets/png/logo-without-text.png'
import SearchInput from './SearchInput'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

interface HeaderProps {
  readonly style?: StyleProp<ViewStyle>
  readonly hiddenAddress?: boolean
  readonly searchProducts?: boolean
}

const Header: React.FC<HeaderProps> = ({
  style,
  hiddenAddress,
  searchProducts,
}) => {
  const { goBack } = useNavigation()
  return (
    <View style={[tailwind('relative bg-primary-500 h-40'), style]}>
      <View style={tailwind('px-4')}>
        {!hiddenAddress && (
          <TouchableOpacity
            onPress={() => goBack()}
            style={tailwind('px-4 absolute py-2')}
          >
            <Ionicons name="md-arrow-back" size={35} color="#fff" />
          </TouchableOpacity>
        )}
        {!hiddenAddress && (
          <AddressChanger style={tailwind('absolute right-0 mr-4 mt-2')} />
        )}
        <View style={tailwind('items-center')}>
          <Image
            source={Logo}
            resizeMode="contain"
            style={tailwind(`h-20 mb-2 ${hiddenAddress ? '' : ''}`)}
          />
        </View>
        <SearchInput searchProducts={searchProducts} />
      </View>
    </View>
  )
}

Header.displayName = 'Header'

export default Header
