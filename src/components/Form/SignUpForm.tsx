import React, { RefObject, useRef } from 'react'
import {
  StyleProp,
  View,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native'
import { tailwind } from 'lib/styles'
import { Form } from '@unform/mobile'
import { FormHandles, SubmitHandler } from '@unform/core'
import Input from './Input'
import { SignUpFormData } from 'types/app'

interface SignUpFormProps {
  readonly style?: StyleProp<ViewStyle>
  readonly formRef: RefObject<FormHandles>
  handleSubmit: SubmitHandler<SignUpFormData>
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  style,
  formRef,
  handleSubmit,
}) => {
  const firstNameInputRef = useRef<TextInput>(null)
  const lastNameInputRef = useRef<TextInput>(null)
  const password1InputRef = useRef<TextInput>(null)
  const password2InputRef = useRef<TextInput>(null)
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[tailwind(''), style]}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="email"
            label="Email"
            keyboardType="email-address"
            placeholder="Digite seu melhor email"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => {
              firstNameInputRef.current?.focus()
            }}
          />
          <Input
            ref={firstNameInputRef}
            autoCapitalize="words"
            name="firstName"
            label="Primeiro nome"
            placeholder="Digite seu nome"
            returnKeyType="next"
            onSubmitEditing={() => {
              lastNameInputRef.current?.focus()
            }}
          />
          <Input
            ref={lastNameInputRef}
            autoCapitalize="words"
            name="lastName"
            label="Ultimo nome"
            placeholder="Digite seu último nome"
            returnKeyType="next"
            onSubmitEditing={() => {
              password1InputRef.current?.focus()
            }}
          />

          <Input
            ref={password1InputRef}
            secureTextEntry
            name="password"
            label="Senha"
            placeholder="Digite sua senha"
            returnKeyType="next"
            textContentType="newPassword"
            onSubmitEditing={() => {
              password2InputRef.current?.focus()
            }}
          />
          <Input
            ref={password2InputRef}
            secureTextEntry
            name="confirmPassword"
            label="Repita sua senha"
            placeholder="Digite novamente sua senha"
            returnKeyType="send"
            textContentType="newPassword"
            onSubmitEditing={() => formRef.current?.submitForm()}
          />
        </Form>
      </View>
    </KeyboardAvoidingView>
  )
}
SignUpForm.displayName = 'SignUpForm'

export default SignUpForm
