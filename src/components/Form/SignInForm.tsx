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
import { SignInFormData } from 'types/app'

interface SignInFormProps {
  readonly style?: StyleProp<ViewStyle>
  readonly formRef: RefObject<FormHandles>
  handleSubmit: SubmitHandler<SignInFormData>
}

const SignInForm: React.FC<SignInFormProps> = ({
  style,
  formRef,
  handleSubmit,
}) => {
  const passwordInputRef = useRef<TextInput>(null)
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[tailwind(''), style]}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            style={tailwind('mb-6')}
            name="email"
            label="Email"
            keyboardType="email-address"
            placeholder="Digite seu email"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInputRef.current?.focus()
            }}
          />
          <Input
            ref={passwordInputRef}
            secureTextEntry
            name="password1"
            label="Senha"
            placeholder="Digite sua senha"
            returnKeyType="send"
            onSubmitEditing={() => formRef.current?.submitForm()}
          />
        </Form>
      </View>
    </KeyboardAvoidingView>
  )
}

SignInForm.displayName = 'SignInForm'

export default SignInForm
