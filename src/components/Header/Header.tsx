import React, { Dispatch, SetStateAction } from 'react'
import {
  StyleProp,
  View,
  ViewStyle,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native'
import { tailwind } from 'lib/styles'
import AddressChanger from './AddressChanger'
import Logo from '../../../assets/png/logo-without-text.png'
import SearchInput from './SearchInput'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { MarketWithCategories } from 'types/app'

interface HeaderProps {
  readonly style?: StyleProp<ViewStyle>
  readonly hiddenAddress?: boolean
  readonly hiddenSearch?: boolean
  readonly hiddenBackArrow?: boolean
  readonly searchProducts?: boolean
  readonly store?: MarketWithCategories
  readonly searchValue?: string | undefined
  setSearchValue?: Dispatch<SetStateAction<string | undefined>>
}

const Header: React.FC<HeaderProps> = ({
  style,
  hiddenAddress,
  hiddenSearch,
  searchProducts,
  hiddenBackArrow,
  store,
  searchValue,
  setSearchValue,
}) => {
  const { goBack, navigate } = useNavigation()

  const storeNameIsBig = store && store.name.length > 15
  return (
    <View
      style={[
        tailwind(`relative bg-primary-500 ${hiddenSearch ? 'h-24' : 'h-40'}`),
        style,
      ]}
    >
      <View style={tailwind('px-4 relative')}>
        {!hiddenAddress && (
          <AddressChanger style={tailwind('absolute left-0 ml-4 mt-2')} />
        )}
        <View style={tailwind('flex-row items-center')}>
          {!hiddenBackArrow && (
            <View style={tailwind('')}>
              <TouchableOpacity
                onPress={() => goBack()}
                style={tailwind('px-4 py-5')}
              >
                <Ionicons name="md-arrow-back" size={35} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
          <View style={tailwind('pt-1 w-full')}>
            {store ? (
              <TouchableOpacity
                onPress={() => navigate('StoreDetailsPage', { market: store })}
                style={tailwind('h-20 flex-row items-center')}
              >
                <Text
                  style={tailwind(
                    `text-white mr-2 w-3/4 text-center ${
                      storeNameIsBig ? 'text-2xl' : 'text-4xl'
                    }`,
                  )}
                >
                  {store.name}
                </Text>
                <Ionicons
                  style={tailwind('-mt-4')}
                  name="ios-information-circle"
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            ) : (
              <View style={tailwind('items-center w-full')}>
                <Image
                  source={Logo}
                  resizeMode="contain"
                  style={tailwind('h-20 mb-2')}
                />
              </View>
            )}
          </View>
        </View>
        {!hiddenSearch && setSearchValue && (
          <SearchInput
            searchProducts={searchProducts}
            setSearchValue={setSearchValue}
            searchValue={searchValue}
          />
        )}
      </View>
    </View>
  )
}

Header.displayName = 'Header'

export default Header
