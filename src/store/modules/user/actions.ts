import { FullAddressData, IUser, UpdateUserFormData } from 'types/app'

export function updateUserRequest(data: UpdateUserFormData) {
  return {
    type: '@user/UPDATE_USER_REQUEST',
    data,
  }
}

export function addUserAddressRequest(data: FullAddressData) {
  return {
    type: '@user/ADD_USER_ADDRESS_REQUEST',
    data,
  }
}

export function updateUserAddresses(id: number) {
  return {
    type: '@user/UPDATE_ADDRESSES',
    id,
  }
}

export function updateUserSuccess(viewer: IUser) {
  return {
    type: '@user/UPDATE_USER_SUCCESS',
    viewer,
  }
}

export function updateUserFailure() {
  return {
    type: '@user/UPDATE_USER_FAILURE',
  }
}

export function updateUserAddressActive(addressId: number) {
  return {
    type: '@user/UPDATE_USER_ADDRESS_ACTIVE',
    addressId,
  }
}
