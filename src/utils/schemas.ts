import * as Yup from 'yup'

export const signInSchema = Yup.object().shape({
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  password: Yup.string()
    .required('Senha obrigatória')
    .min(6, 'No mínimo 6 digitos na senha'),
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

export const cepSchema = Yup.object().shape({
  cep: Yup.number().required('CEP obrigatório').min(8, 'No mínimo 8 digitos'),
})
