import { FormHandles, SubmitHandler } from '@unform/core'
import { Form } from '@unform/mobile'
import { tailwind } from 'lib/styles'
import React, { RefObject, useRef } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  TextInput,
  View,
  ViewStyle,
} from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from 'store/modules/rootReducer'
import { UpdateUserFormData } from 'types/app'
import Input from './Input'

interface UpdateUserFormProps {
  readonly style?: StyleProp<ViewStyle>
  readonly formRef: RefObject<FormHandles>
  handleSubmit: SubmitHandler<UpdateUserFormData>
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({
  style,
  formRef,
  handleSubmit,
}) => {
  const { user } = useSelector((state: RootState) => state.user)
  const firstNameInputRef = useRef<TextInput>(null)
  const lastNameInputRef = useRef<TextInput>(null)
  const cpfInputRef = useRef<TextInput>(null)
  const bornDateInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)

  const initialFormData = {
    email: user?.email,
    firstName: user?.firstName,
    lastName: user?.lastName,
    cpf: user?.cpf,
    boarnDate: user?.boarnDate,
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[tailwind(''), style]}>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={initialFormData}
        >
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
              cpfInputRef.current?.focus()
            }}
          />

          <Input
            ref={cpfInputRef}
            name="cpf"
            label="CPF"
            placeholder="Digite seu cpf"
            returnKeyType="next"
            keyboardType="number-pad"
            maxLength={11}
            onSubmitEditing={() => {
              bornDateInputRef.current?.focus()
            }}
          />
          <Input
            ref={bornDateInputRef}
            name="boarnDate"
            label="Data de nascimento"
            placeholder="Digite sua data de nascimento"
            returnKeyType="send"
            maxLength={10}
            onSubmitEditing={() => {
              passwordInputRef.current?.focus()
            }}
          />
          <Input
            ref={passwordInputRef}
            secureTextEntry
            name="password"
            label="Nova senha"
            placeholder="Se quiser, digite uma nova senha"
            returnKeyType="send"
            textContentType="newPassword"
            onSubmitEditing={() => formRef.current?.submitForm()}
          />
        </Form>
      </View>
    </KeyboardAvoidingView>
  )
}

UpdateUserForm.displayName = 'UpdateUserForm'

export default UpdateUserForm
