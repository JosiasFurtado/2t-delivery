import { SignInFormData, SignUpFormData, IUser, UserAddress } from 'types/app'

export function signInRequest(data: SignInFormData) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    data,
  }
}

export function signInSuccess(user: IUser, token: string) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    user,
    token,
  }
}

export function signUpRequest(data: SignUpFormData) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    data,
  }
}

export function signUpSuccess(data: SignUpFormData) {
  return {
    type: '@auth/SIGN_UP_SUCCESS',
    data,
  }
}

export function signFailure(error: string[] | null) {
  return {
    type: '@auth/SIGN_FAILURE',
    error,
  }
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  }
}

export function getUserAddressSuccess(addresses: UserAddress[]) {
  return {
    type: '@user/GET_USER_ADDRESS_SUCCESS',
    addresses,
  }
}
