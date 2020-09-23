import React from 'react'
import {
  StyleProp,
  View,
  ViewStyle,
  Image,
  Text,
  TouchableOpacity
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
  readonly storeName?: string
}

const Header: React.FC<HeaderProps> = ({
  style,
  hiddenAddress,
  searchProducts,
  storeName
}) => {
  const { goBack } = useNavigation()
  return (
    <View style={[tailwind('relative bg-primary-500 h-40'), style]}>
      <View style={tailwind('px-4')}>
        {!hiddenAddress && (
          <TouchableOpacity
            onPress={() => goBack()}
            style={tailwind('px-4 py-2 absolute')}
          >
            <Ionicons name="md-arrow-back" size={35} color="#fff" />
          </TouchableOpacity>
        )}
        {!hiddenAddress && (
          <AddressChanger style={tailwind('absolute right-0 mr-4 mt-2')} />
        )}
        <View style={tailwind('items-center pt-1')}>
          {storeName ? (
            <View style={tailwind('justify-center h-20')}>

              <Text style={tailwind('text-white text-4xl')}>{storeName}</Text>
            </View>
          ) : (
              <Image
                source={Logo}
                resizeMode="contain"
                style={tailwind(`h-20 mb-2 ${hiddenAddress ? '' : ''}`)}
              />
            )}
        </View>
        <SearchInput searchProducts={searchProducts} />
      </View>
    </View>
  )
}

Header.displayName = 'Header'

export default Header
