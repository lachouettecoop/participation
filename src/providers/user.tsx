import type { User } from "src/types/model"

import { createContext, useContext, useState, FC } from "react"

import { USER_BY_ID } from "src/queries"
import apollo from "src/helpers/apollo"

export interface LoginResponse {
  userId: number
  token: string
}

export interface Auth {
  token: string
  user: User
}

export interface IUserContext<IsAuthenticated extends boolean = false> {
  auth: IsAuthenticated extends true ? Auth : Auth | null
  login: (response: LoginResponse) => Promise<void>
  logout: () => void
}

const UserContext = createContext<IUserContext>({} as IUserContext)

const STORAGE_KEY = "auth"

export const getStoredUser = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    return null
  }
  return JSON.parse(stored) as Auth
}

export const UserProvider: FC = ({ children }) => {
  const [auth, setAuth] = useState<Auth | null>(getStoredUser)

  const login = async ({ userId, token }: LoginResponse) => {
    const result = await apollo.query<{ user: User }>({
      query: USER_BY_ID,
      variables: { id: `api/users/${userId}` },
    })
    const { user } = result.data

    if (!user.rolesChouette.find(({ roleUniqueId }) => roleUniqueId === "GH")) {
      alert(`${user.prenom}, vous n’êtes pas Grand Hibou`)
      return
    }

    const data = {
      token,
      user,
    }
    setAuth(data)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  const logout = () => {
    setAuth(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  return <UserContext.Provider value={{ auth, login, logout }}>{children}</UserContext.Provider>
}

export function useUser<IsAuthenticated extends boolean = false>() {
  return useContext(UserContext) as IUserContext<IsAuthenticated>
}
