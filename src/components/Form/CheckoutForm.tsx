/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Dispatch, RefObject, SetStateAction } from 'react'
import {
  StyleProp,
  View,
  ViewStyle,
  Platform,
  KeyboardAvoidingView
} from 'react-native'
import { tailwind } from 'lib/styles'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import InputMask from './InputMask'

interface CheckoutFormProps {
  readonly style?: StyleProp<ViewStyle>
  readonly formRef: RefObject<FormHandles>
  readonly checkoutForm: { phone: string | undefined; cpf: string | undefined; }
  setCheckoutForm: Dispatch<SetStateAction<{ phone: string | undefined; cpf: string | undefined; }>>
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  style,
  formRef,
  checkoutForm,
  setCheckoutForm
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={style}>
        <Form ref={formRef} onSubmit={() => {
          // This it is not necessary
        }}>
          <InputMask
            type="cel-phone"
            // @ts-ignore
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) '
            }}
            value={checkoutForm.phone}
            style={tailwind('mb-3')}
            name="phone"
            label="Telefone * Obrigatório"
            keyboardType="number-pad"
            placeholder="Digite seu telefone"
            onChangeText={(e: any) => setCheckoutForm({ phone: e, cpf: checkoutForm.cpf })}

          />
          <InputMask
            type="cpf"
            // @ts-ignore
            name="cpf"
            value={checkoutForm.cpf}
            onChangeText={(e: any) => setCheckoutForm({ phone: checkoutForm.phone, cpf: e })}
            label="CPF"
            placeholder="Digite seu CPF"
            returnKeyType="send"
          />
        </Form>
      </View>
    </KeyboardAvoidingView>
  )
}

CheckoutForm.displayName = 'CheckoutForm'

export default CheckoutForm
