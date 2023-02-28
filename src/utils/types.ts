export type InvalidInput<T extends string> = {
  code: 'invalid_input'
  payload: Record<T, string>
}

export type UserNotFound = {
  code: 'user_not_found'
  message: string
}
