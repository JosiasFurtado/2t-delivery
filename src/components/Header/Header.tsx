import React from 'react'
import { StyleProp, View, ViewStyle, Image } from 'react-native'
import { tailwind } from 'lib/styles'
import AddressChanger from './AddressChanger'
import Logo from '../../../assets/png/logo-without-text.png'
import SearchInput from './SearchInput'

interface HeaderProps {
  readonly style?: StyleProp<ViewStyle>
  readonly hiddenAddress?: boolean
}

const Header: React.FC<HeaderProps> = ({ style, hiddenAddress }) => {
  return (
    <View style={tailwind('relative bg-primary-500 h-40')}>
      <View style={tailwind('px-4')}>
        {!hiddenAddress && <AddressChanger />}
        <View style={tailwind('items-center')}>
          <Image
            source={Logo}
            resizeMode="contain"
            style={tailwind(`h-20 mb-2 ${hiddenAddress ? '' : '-mt-6'}`)}
          />
        </View>
        <SearchInput />
      </View>
    </View>
  )
}

Header.displayName = 'Header'

export default Header
