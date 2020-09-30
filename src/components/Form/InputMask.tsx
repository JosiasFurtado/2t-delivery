import React, { useCallback, useState } from 'react'
import { TextInputMask, TextInputMaskTypeProp } from 'react-native-masked-text'
import Input from './Input'

interface InputMaskProps {
  type: TextInputMaskTypeProp
}

const InputMask: React.FC<InputMaskProps> = ({ type, ...rest }) => {
  const [value, setValue] = useState('')
  const [rawValue, setRawValue] = useState('')
  const handleOnChangeText = useCallback((maskedValue, unmaskedValue) => {
    setValue(maskedValue)
    setRawValue(unmaskedValue)
  }, [])
  return (
    <TextInputMask
      type={type}
      includeRawValueInChangeText
      value={value}
      onChangeText={handleOnChangeText}
      customTextInput={Input}
      customTextInputProps={{
        rawValue,
        ...rest,
      }}
      {...rest}
    />
  )
}

InputMask.displayName = 'InputMask'

export default InputMask
