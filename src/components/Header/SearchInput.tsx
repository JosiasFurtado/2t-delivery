import React, { Dispatch, SetStateAction } from 'react'
import { StyleProp, TextInput, View, ViewStyle } from 'react-native'
import { tailwind } from 'lib/styles'
import { Ionicons } from '@expo/vector-icons'

interface SearchInputProps {
  readonly style?: StyleProp<ViewStyle>
  readonly searchProducts?: boolean
  readonly searchValue: string | undefined
  setSearchValue: Dispatch<SetStateAction<string | undefined>>
}

const SearchInput: React.FC<SearchInputProps> = ({ style, searchProducts, searchValue, setSearchValue }) => {

  return (
    <View style={[style, tailwind('relative justify-center')]}>
      <Ionicons
        style={tailwind('absolute ml-3')}
        name="md-search"
        size={26}
        color="#fcfcfc"
      />
      <TextInput
        style={tailwind(
          'rounded bg-white-transparent bg-opacity-25 py-3 text-base px-10 text-white',
        )}
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="default"
        placeholder={
          searchProducts
            ? 'Busque aqui por seus produtos'
            : 'Busque o estabelecimento'
        }
        placeholderTextColor="#fcfcfc"
        onChangeText={e => setSearchValue(e)}
        value={searchValue}
        returnKeyType="search"
      />
    </View>
  )
}

SearchInput.displayName = 'SearchInput'

export default SearchInput
