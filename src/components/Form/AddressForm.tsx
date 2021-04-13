import React, { RefObject, useRef } from 'react'
import {
  StyleProp,
  View,
  ViewStyle,
  Platform,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native'
import { tailwind } from 'lib/styles'
import Input from './Input'
import { Form } from '@unform/mobile'
import { FormHandles, SubmitHandler } from '@unform/core'
import { AddressFormData } from 'types/app'

interface AddressFormProps {
  readonly style?: StyleProp<ViewStyle>
  readonly formRef: RefObject<FormHandles>
  handleSubmit: SubmitHandler<AddressFormData>
}

const AddressForm: React.FC<AddressFormProps> = ({
  style,
  formRef,
  handleSubmit,
}) => {
  const nameInputRef = useRef<TextInput>(null)
  const numberInputRef = useRef<TextInput>(null)
  const aditionalInfoInputRef = useRef<TextInput>(null)
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={style}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="zipcode"
            label="Seu CEP"
            textContentType="postalCode"
            placeholder="Ex: 99099099"
            keyboardType="phone-pad"
            returnKeyType="done"
            style={tailwind('mb-3')}
            maxLength={8}
            autoCompleteType="postal-code"
            onSubmitEditing={() => {
              nameInputRef.current?.focus()
            }}
          />
          <Input
            ref={nameInputRef}
            style={tailwind('mb-3')}
            name="name"
            label="Apelido para o endereço"
            keyboardType="default"
            placeholder="Ex: Casa, trabalho, casa da namorada"
            returnKeyType="next"
            onSubmitEditing={() => {
              numberInputRef.current?.focus()
            }}
          />
          <Input
            ref={numberInputRef}
            style={tailwind('mb-3')}
            name="number"
            label="Número do endereço"
            keyboardType="phone-pad"
            placeholder="Digite o número do endereço"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => {
              aditionalInfoInputRef.current?.focus()
            }}
          />
          <Input
            ref={aditionalInfoInputRef}
            name="aditionalInfo"
            label="Informação adicional"
            placeholder="Ex: Apto 30 ou quadra 2, lote 1"
            keyboardType="default"
            returnKeyType="send"
            style={tailwind('mb-6')}
            onSubmitEditing={() => formRef.current?.submitForm()}
          />
        </Form>
      </View>
    </KeyboardAvoidingView>
  )
}

AddressForm.displayName = 'AddressForm'

export default AddressForm
