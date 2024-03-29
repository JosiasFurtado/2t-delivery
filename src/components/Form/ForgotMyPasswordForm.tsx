import React, { RefObject } from 'react'
import {
  StyleProp,
  View,
  ViewStyle,
  Platform,
  KeyboardAvoidingView,
} from 'react-native'
import { tailwind } from 'lib/styles'
import Input from './Input'
import { Form } from '@unform/mobile'
import { SubmitHandler, FormHandles } from '@unform/core'
import { ForgotPasswordFormData } from 'types/app'

interface ForgotMyPasswordFormProps {
  readonly style?: StyleProp<ViewStyle>
  readonly formRef: RefObject<FormHandles>
  handleSubmit: SubmitHandler<ForgotPasswordFormData>
}

const ForgotMyPasswordForm: React.FC<ForgotMyPasswordFormProps> = ({
  style,
  formRef,
  handleSubmit,
}) => (
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
  >
    <View style={[tailwind(''), style]}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          style={tailwind('mb-6')}
          name="email"
          label="Email"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Digite seu email"
          returnKeyType="send"
          onSubmitEditing={() => formRef.current?.submitForm()}
        />
      </Form>
    </View>
  </KeyboardAvoidingView>
)

ForgotMyPasswordForm.displayName = 'ForgotMyPasswordForm'

export default ForgotMyPasswordForm
