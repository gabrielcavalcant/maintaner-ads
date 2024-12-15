import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useColorScheme } from 'nativewind'
import {
  LayoutDashboard,
  CircleUserRound,
  Bike,
  FileText,
  Component,
  Users,
} from '@/components/icons'
import { useRoute } from '@react-navigation/native'
import { Href, usePathname, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { LucideIcon } from 'lucide-react-native'
import { useTheme } from '@/app/theme' // ajuste o caminho conforme necessário
import * as Haptics from 'expo-haptics'

export default function NavigationBar() {
  const insets = useSafeAreaInsets()
  const { colors } = useTheme()

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      <Icon route={'/'} IconComp={LayoutDashboard} label='Relatórios' />
      <Icon route={'/motorcycle'} IconComp={Bike} label='Motocicletas' />
      <Icon
        route={'/maintenanceRequests'}
        IconComp={FileText}
        label='Manutenções'
      />
      <Icon route={'/teams'} IconComp={Users} label='Equipes' />
      <Icon route={'/profile'} IconComp={CircleUserRound} label='Perfil' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    paddingVertical: 16,
  },
  iconContainer: {
    aspectRatio: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    padding: 10,
  },
})

type IconProps = {
  route: Href<string | object>
  IconComp: LucideIcon
  label?: string
}

function Icon({ route, IconComp, label }: IconProps) {
  const router = useRouter()
  const { colors } = useTheme()
  const pathname = usePathname()

  const getIconColor = (path: Href<string | object>) => {
    return pathname === path ? colors.primary : colors.foreground
  }

  const handleNavigation = (path: Href<string | object>) => {
    router.navigate(path)
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
  }

  return (
    <TouchableOpacity onPress={() => handleNavigation(route)}>
      <View style={styles.iconContainer}>
        <IconComp size={30} color={getIconColor(route)} />
      </View>
    </TouchableOpacity>
  )
}
