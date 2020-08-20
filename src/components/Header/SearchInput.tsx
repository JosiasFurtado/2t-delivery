import React, { useState } from 'react'
import { StyleProp, TextInput, View, ViewStyle } from 'react-native'
import { tailwind } from 'lib/styles'
import { Ionicons } from '@expo/vector-icons'

interface SearchInputProps {
  readonly style?: StyleProp<ViewStyle>
}

const SearchInput: React.FC<SearchInputProps> = ({ style }) => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = () => {
    if (searchValue === '') {
      return
    }
  }

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
          'rounded bg-white-transparent bg-opacity-25 py-2 px-10 text-white',
        )}
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="default"
        placeholder="Busque aqui por seus produtos"
        placeholderTextColor="#fcfcfc"
        onChangeText={e => setSearchValue(e)}
        value={searchValue}
        returnKeyType="search"
        onSubmitEditing={() => handleSearch()}
      />
    </View>
  )
}

SearchInput.displayName = 'SearchInput'

export default SearchInput
