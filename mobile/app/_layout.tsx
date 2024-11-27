import { Slot } from 'expo-router'
import './globals.css'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AuthProvider } from '@/context/authContext'
import { RootSiblingParent } from 'react-native-root-siblings'

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <RootSiblingParent>
        <AuthProvider>
          <Slot screenOptions={{ headerShown: false }} />
        </AuthProvider>
      </RootSiblingParent>
    </GestureHandlerRootView>
  )
}
