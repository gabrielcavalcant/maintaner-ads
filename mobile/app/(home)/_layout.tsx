import { Stack, useRouter, usePathname, Href } from 'expo-router'
import { useColorScheme } from 'nativewind'
import { Text, View, TouchableOpacity, Vibration } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  LayoutDashboard,
  CircleUserRound,
  Bike,
  FileText,
  Component,
  Users,
} from '@/components/icons'
import * as Haptics from 'expo-haptics'
import NavigationBar from '@/components/navigation-bar'

export default function Layout() {
  const { colorScheme } = useColorScheme()
  const insets = useSafeAreaInsets()

  return (
    <View className='flex-1' style={{ paddingTop: insets.top }}>
      {/* Conteúdo de navegação */}
      <View className='flex-1'>
        <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
          <Stack.Screen
            name='index'
            options={{
              title: 'Dashboard',
            }}
          />
          <Stack.Screen
            name='profile'
            options={{
              title: 'Perfil',
            }}
          />
          <Stack.Screen
            name='motorcycle'
            options={{
              title: 'Motorcycle',
            }}
          />
          <Stack.Screen
            name='motorcycleDetails'
            options={{
              title: 'MotorcycleDetails',
            }}
          />
          <Stack.Screen
            name='maintenanceRequests'
            options={{
              title: 'Solicitações de Manutenção',
            }}
          />

          <Stack.Screen
            name='register-items'
            options={{ title: 'Registrar Itens' }}
          />
          <Stack.Screen name='teams' options={{ title: 'Equipes' }} />
        </Stack>
      </View>

      <NavigationBar />
    </View>
  )
}
