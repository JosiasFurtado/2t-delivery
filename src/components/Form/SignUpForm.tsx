import React, { RefObject } from 'react'
import {
  StyleProp,
  View,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { tailwind } from 'lib/styles'
import { Form } from '@unform/mobile'
import { Scope, FormHandles, SubmitHandler } from '@unform/core'
import Input from './Input'

interface SignUpFormProps {
  readonly style?: StyleProp<ViewStyle>
  readonly formRef: RefObject<FormHandles>
  handleSubmit: SubmitHandler<FormData>
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  style,
  formRef,
  handleSubmit,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[tailwind(''), style]}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="email"
            label="Email"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Digite seu melhor email"
          />
          <Input
            name="firstName"
            label="Primeiro nome"
            placeholder="Digite seu nome"
          />
          <Input
            name="LastName"
            label="Ultimo nome"
            placeholder="Digite seu último nome"
          />

          <Scope path="password">
            <Input
              name="password1"
              label="Senha"
              placeholder="Digite sua senha"
            />
            <Input
              name="password2"
              label="Repita sua senha"
              placeholder="Digite novamente sua senha"
            />
          </Scope>
        </Form>
      </View>
    </KeyboardAvoidingView>
  )
}
SignUpForm.displayName = 'SignUpForm'

export default SignUpForm
