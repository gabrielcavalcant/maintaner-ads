import { useAuth } from '@/context/authContext'
import { Redirect, Stack } from 'expo-router'

export default function AuthRoutesLayout() {
  const { user } = useAuth()

  if (user) {
    return <Redirect href={'/'} />
  }

  return <Stack screenOptions={{ headerShown: false }} />
}
