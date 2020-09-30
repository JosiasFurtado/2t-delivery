import { IUser, UpdateUserFormData } from 'types/app'

export function updateUserRequest(data: UpdateUserFormData) {
  return {
    type: '@user/UPDATE_USER_REQUEST',
    data,
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
