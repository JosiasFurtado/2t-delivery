import { SignInFormData, SignUpFormData } from 'types/app'

export function signInRequest(data: SignInFormData) {
  return {
    type: '@user/SIGNIN_REQUEST',
    data,
  }
}

export function signInSuccess(data: SignInFormData) {
  return {
    type: '@user/SIGNIN_SUCCESS',
    data,
  }
}

export function signUpRequest(data: SignUpFormData) {
  return {
    type: '@user/SIGNUP_REQUEST',
    data,
  }
}

export function signUpSuccess(data: SignUpFormData) {
  return {
    type: '@user/SIGNUP_SUCCESS',
    data,
  }
}
