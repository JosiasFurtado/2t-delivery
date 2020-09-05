import { IUser } from 'types/app'

export function updateUserRequest(data) {
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
