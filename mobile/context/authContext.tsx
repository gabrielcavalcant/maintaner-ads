import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode'
import { useNavigation } from '@react-navigation/native'
import { AuthToken, User } from '@/types'
import { ApiRequest } from '@/lib/request.module'
import { router } from 'expo-router'
import axios, { AxiosResponse } from 'axios'

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextProps {
  user: User | null
  isLoading: boolean
  signIn: (values: {
    email: string
    password: string
  }) => Promise<{ success: boolean; message?: string; error?: any }>
  signOut: () => void
  signUp: (values: {
    fullName: string
    email: string
    password: string
  }) => Promise<{ success: boolean; message?: string; error?: any }>
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const navigation = useNavigation()

  const autoLogin = async (values: {
    email: string
    password: string
  }): Promise<{ success: boolean; message?: string; error?: any }> => {
    const API = new ApiRequest()
    const { email, password } = values

    try {
      const response: AxiosResponse<AuthToken> = await API.ApiRequest(
        '/auth/signin',
        {
          email,
          hash: password,
        },
      )

      const data = response.data
      console.log("data",data)

      if (data?.statusCode === 403 || data?.statusCode === 401) {
        return { success: false, message: 'Email ou senha incorretos.' }
      }

      const token: string = data?.accessToken
      const permissions = data?.permission

      if (token) {
        const userData = {
          ...jwtDecode(token),
          permission: permissions,
        } as User
        setUser(userData)

        const session = JSON.stringify({
          ...response,
          permission: userData.permission,
        })

        await AsyncStorage.setItem('session', session)
        return { success: true }
      } else {
        return { success: false, message: 'Login falhou.' }
      }
    } catch (error) {
      console.log(error)
      return { success: false, message: 'Erro no servidor.', error }
    }
  }

  useEffect(() => {
    autoLogin({ email: 'admin@gmail.com', password: '123' })
  }, [])

  const signIn = async (values: {
    email: string
    password: string
  }): Promise<{ success: boolean; message?: string; error?: any }> => {
    const API = new ApiRequest()
    const { email, password } = values

    try {
      const response: AxiosResponse<AuthToken> = await API.ApiRequest(
        '/auth/signin',
        {
          email,
          hash: password,
        },
      )
      console.log(response);

      const data = response.data

      if (data?.statusCode === 403 || data?.statusCode === 401) {
        return { success: false, message: 'Email ou senha incorretos.' }
      }

      const token: string = data?.accessToken
      const permissions = data?.permission

      if (token) {
        const userData = {
          ...jwtDecode(token),
          permission: permissions,
        } as User
        setUser(userData)

        const session = JSON.stringify({
          ...response,
          permission: userData.permission,
        })

        await AsyncStorage.setItem('session', session)
        return { success: true }
      } else {
        return { success: false, message: 'Login falhou.' }
      }
    } catch (error) {
      return { success: false, message: 'Erro no servidor.', error }
    }
  }

  const signUp = async (values: {
    fullName: string
    email: string
    password: string
  }): Promise<{ success: boolean; message?: string; error?: any }> => {
    const API = new ApiRequest()
    const { fullName, email, password } = values

    try {
      const response: AxiosResponse<AuthToken> = await API.ApiRequest(
        '/auth/signup',
        {
          fullName,
          email,
          hash: password,
        },
      )

      const data = response.data

      if (data?.statusCode === 409) {
        return { success: false, message: 'Email já cadastrado.' }
      }

      const token: string = data?.accessToken
      const permissions = data?.permission

      if (token) {
        const userData = {
          ...jwtDecode(token),
          permission: permissions,
        } as User
        setUser(userData)

        const session = JSON.stringify({
          ...response,
          permission: userData.permission,
        })

        await AsyncStorage.setItem('session', session)
        return { success: true }
      } else {
        return { success: false, message: 'Criação de conta falhou.' }
      }
    } catch (error) {
      return { success: false, message: 'Erro no servidor.', error }
    }
  }

  const signOut = useCallback(async () => {
    setUser(null)
    await AsyncStorage.removeItem('session')
    router.replace('/(auth)/sign-in')
  }, [navigation])

  useEffect(() => {
    const checkSession = async () => {
      const session = await AsyncStorage.getItem('session')
      if (session) {
        const parsedSession: AuthToken = JSON.parse(session)
        try {
          const userData = {
            ...jwtDecode(parsedSession.accessToken),
            permission: parsedSession.permission,
          } as User
          setUser(userData)
        } catch (error) {
          signOut()
        }
      } else {
        signOut()
      }
      setIsLoading(false)
    }

    checkSession()
  }, [signOut])

  const values = useMemo(() => {
    return {
      signIn,
      signUp,
      signOut,
      user,
      isLoading,
    }
  }, [isLoading, signOut, user])

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
