import { isAxiosError } from 'axios'
import User from '../models/User'
import instance from '../utils/axios'
import Either, { Left, Right } from '../utils/either'
import { UserNotFound } from '../utils/types'

type LoggedUser = { loggedUser: User }
type GetLoggedUserResult = Either<UserNotFound, LoggedUser>
export async function getLoggedUser(): Promise<GetLoggedUserResult> {
  try {
    const {
      data: { loggedUser },
    } = await instance.get('/users/logged')
    return Right.create({ loggedUser: { ...loggedUser, id: loggedUser._id } })
  } catch (error) {
    if (isAxiosError<UserNotFound>(error)) {
      if (error.response) return Left.create(error.response?.data)
    }

    throw new Error(error as string)
  }
}
