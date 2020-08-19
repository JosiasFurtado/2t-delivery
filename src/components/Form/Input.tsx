import React, { useRef, useEffect, useState } from 'react'
import {
  Text,
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { useField } from '@unform/core'
import { tailwind } from 'lib/styles'

interface Props {
  readonly style?: StyleProp<ViewStyle>
  readonly name: string
  readonly label?: string
}
type InputProps = TextInputProps & Props
const Input: React.FC<InputProps> = ({ style, name, label, ...rest }) => {
  const inputRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  const { fieldName, registerField, defaultValue, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: '_lastNativeText',
      setValue(ref, value) {
        ref.setNativeProps({ text: value })
        ref._lastNativeText = value
      },
      clearValue(ref) {
        ref.setNativeProps({ text: '' })
        ref._lastNativeText = ''
      },
    })
  }, [fieldName, registerField])

  return (
    <>
      {label && <Text>{label}</Text>}

      <TextInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          tailwind(
            `h-10 border-b-2 mb-2 ${
              isFocused ? 'border-primary-500' : 'border-gray-500'
            }`,
          ),
          style,
        ]}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  )
}

export default Input
