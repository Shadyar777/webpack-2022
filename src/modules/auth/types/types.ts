export type SignInParams = {
  username: string
  password: string
}

export type ChangePasswordParams = {
  newPassword: string
  currentPassword: string
  confirmNewPassword: string
}
