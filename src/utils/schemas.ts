import * as Yup from 'yup'

export const signInSchema = Yup.object().shape({
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  password: Yup.string()
    .required('Senha obrigatória')
    .min(6, 'No mínimo 6 digitos'),
})

export const signUpSchema = Yup.object().shape({
  email: Yup.string()
    .required('E-mail é obrigatório')
    .email('Digite um e-mail válido'),
  firstName: Yup.string().required('Nome é obrigatório'),
  lastName: Yup.string().required('Nome é obrigatório'),
  password: Yup.string().min(6, 'No mínimo 6 dígitos'),
  confirmPassword: Yup.string().min(6, 'No mínimo 6 dígitos'),
})

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
})

export const cepSchema = Yup.object().shape({
  cep: Yup.number().required('CEP obrigatório').min(8, 'No mínimo 8 digitos'),
})

export const addressSchema = Yup.object().shape({
  zipcode: Yup.string()
    .required('CEP obrigatório')
    .min(8, 'No mínimo 8 digitos'),
  name: Yup.string().required('Apelido é obrigatório'),
  number: Yup.number().required('O número é obrigatório'),
  aditionalInfo: Yup.string().required('Adicione uma info adicional'),
})

export const checkoutSchema = Yup.object().shape({
  isTakeOut: Yup.boolean().required('Entrega ou retirada é obrigatório'),
  marketId: Yup.number().required('Mercado é obrigatório'),
  items: Yup.array().of(
    Yup.object().shape({
      productId: Yup.number().required('Id de produto obrigatório'),
      amount: Yup.number().required('Quantidade de produto obrigatório'),
      comment: Yup.string(),
    }),
  ),
  paymentMethodId: Yup.number().required(
    'Escolher um método de pagamento é obrigatório',
  ),
  addressId: Yup.number().required('Endereço é obrigatório'),
  windowId: Yup.number().nullable(),
  contact: Yup.string().required('Numero de contato é obrigatório'),
})
