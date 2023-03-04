import { isAxiosError } from 'axios'
import User from '../models/User'
import instance from '../utils/axios'
import { InvalidInput, UserNotFound } from '../utils/types'
import Either, { Left, Right } from '../utils/either'

type RegisterArgs = {
  username: string
  fullName: string
  email: string
  password: string
}

type UserAlreadyExist = {
  code: 'taken_credentials'
  message: string
}

type CreatedUser = { createdUser: User }
type RegisterError = InvalidInput<keyof RegisterArgs> | UserAlreadyExist
type RegisterResult = Either<RegisterError, CreatedUser>
export const register = async (args: RegisterArgs): Promise<RegisterResult> => {
  try {
    const { data } = await instance.post<CreatedUser>('/auth/register', args)
    return Right.create<CreatedUser>({ createdUser: data.createdUser })
  } catch (error) {
    if (isAxiosError<RegisterError>(error)) {
      if (error.response) return Left.create(error.response?.data)
    }

    throw new Error(error as string)
  }
}

type LoginArgs = {
  username: string
  password: string
}

type LoginPayload = {
  access: { token: string; expiresIn: number }
  refresh: { token: string; expiresIn: number }
}

type InvalidCredentials = {
  code: 'invalid_credentials'
  message: string
}

type LoginError = InvalidInput<keyof LoginArgs> | InvalidCredentials
type LoginResult = Either<LoginError, LoginPayload>
export const login = async (args: LoginArgs): Promise<LoginResult> => {
  try {
    const { data } = await instance.post<LoginPayload>('/auth/login', args)
    return Right.create<LoginPayload>(data)
  } catch (error) {
    if (isAxiosError<LoginError>(error)) {
      if (error.response) return Left.create(error.response?.data)
    }

    throw new Error(error as string)
  }
}

type InvalidRefreshToken = {
  code: 'invalid_refresh_token'
  message: string
  payload: { token: string }
}

type RefreshError = InvalidRefreshToken | UserNotFound
type RefreshResult = Either<RefreshError, LoginPayload>
export async function refreshUser(): Promise<RefreshResult> {
  try {
    const { data } = await instance.post<LoginPayload>('/auth/refresh')
    return Right.create({ access: data.access, refresh: data.refresh })
  } catch (error) {
    if (isAxiosError<RefreshError>(error)) {
      if (error.response) return Left.create(error.response?.data)
    }

    throw new Error(error as string)
  }
}

type InternalError = {
  code: 'internal_server_error'
  message: string
}

type LogoutPayload = { message: string }
type LogoutResult = Either<InternalError, LogoutPayload>
export async function logout(): Promise<LogoutResult> {
  try {
    const { data } = await instance.post<LogoutPayload>('/auth/logout')
    return Right.create(data)
  } catch (error) {
    if (isAxiosError<InternalError>(error)) {
      if (error.response) return Left.create(error.response?.data)
    }

    throw new Error(error as string)
  }
}
