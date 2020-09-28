import React, {
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react'
import {
  Text,
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
  View,
} from 'react-native'
import { useField } from '@unform/core'
import { tailwind } from 'lib/styles'

interface Props {
  readonly style?: StyleProp<ViewStyle>
  readonly name: string
  readonly label?: string
}
type InputProps = TextInputProps & Props

interface InputRefProps {
  focus(): void
}

interface InputValueRef {
  value: string
}

const Input: React.RefForwardingComponent<InputRefProps, InputProps> = (
  { style, name, label, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null)
  const { fieldName, registerField, defaultValue = '', error } = useField(name)
  const inputValueRef = useRef<InputValueRef>({ value: defaultValue })
  const [isFocused, setIsFocused] = useState(false)

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus()
    },
  }))
  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value
        inputElementRef.current.setNativeProps({ text: value })
      },
      clearValue() {
        inputValueRef.current.value = ''
        inputElementRef.current.clear()
      },
    })
  }, [fieldName, registerField])

  const passwordInput = label?.includes('senha') || label?.includes('Senha')

  return (
    <View>
      <View style={tailwind('flex-row')}>
        {label && <Text style={tailwind('mr-1')}>{label}</Text>}
        {passwordInput && error ? (
          <Text style={tailwind('text-red-500')}>
            Precisa ter no mínimo 6 dígitos
          </Text>
        ) : null}
      </View>
      <TextInput
        ref={inputElementRef}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          tailwind(
            `h-10 border-b-2 mb-2 ${isFocused
              ? 'border-primary-500'
              : error
                ? 'border-red-500'
                : 'border-gray-500'
            }`,
          ),
          style,
        ]}
        onChangeText={value => {
          inputValueRef.current.value = value
        }}
        defaultValue={defaultValue}
        {...rest}
      />
    </View>
  )
}

export default forwardRef(Input)
