import Button from '@/components/ui/button'
import { useAuth } from '@/context/authContext'
import React from 'react'
import { Appearance, Text, View, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Moon, Sun } from '@/components/icons'
import * as Haptics from 'expo-haptics'
import { useTheme } from '../theme' // Importe o hook useTheme
import Header from '@/components/header'

function getInitials(name: string) {
  const nameParts = name.trim().split(' ')

  if (nameParts.length === 1) {
    return nameParts[0].charAt(0).toUpperCase()
  }

  const initials = `${nameParts[0].charAt(0).toUpperCase()}${nameParts[nameParts.length - 1].charAt(0).toUpperCase()}`
  return initials
}

export default function Profile() {
  const insets = useSafeAreaInsets()
  const { signOut } = useAuth()
  const { user } = useAuth()
  const theme = useTheme() // Usa o tema dinâmico

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, backgroundColor: theme.colors.background },
      ]}
    >
      <Header title='Perfil' />
      <View style={styles.profileContainer}>
        <View style={styles.profileDetails}>
          <View
            style={[styles.avatar, { backgroundColor: theme.colors.input }]}
          >
            <Text
              style={[styles.initials, { color: theme.colors.cardForeground }]}
            >
              {user && getInitials(user?.fullName)}
            </Text>
          </View>
          <Text style={{ color: theme.colors.foreground }}>
            {user?.fullName}
          </Text>
          <View
            style={[styles.badge, { backgroundColor: theme.colors.primary }]}
          >
            <Text style={{ color: theme.colors.primaryForeground }}>
              {user?.email}
            </Text>
          </View>
          <View
            style={[styles.separator, { borderColor: theme.colors.input }]}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button variant='outline'>Alterar senha</Button>
          <Button
            variant='destructive'
            onPress={() => {
              signOut()
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success,
              )
            }}
          >
            Sair da conta
          </Button>
          <Button
            type='icon'
            variant='outline'
            onPress={() => {
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success,
              )
              Appearance.setColorScheme(
                Appearance.getColorScheme() === 'dark' ? 'light' : 'dark',
              )
            }}
            style={[
              styles.themeToggleButton,
              { backgroundColor: theme.colors.background },
            ]} // Usando cor do tema
          >
            {Appearance.getColorScheme() === 'dark' ? (
              <Moon style={[styles.icon]} color={theme.colors.foreground} />
            ) : (
              <Sun style={[styles.icon]} color={theme.colors.foreground} />
            )}
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileDetails: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
    padding: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  avatar: {
    height: 96,
    width: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  separator: {
    marginTop: 16,
    height: 1,
    width: '90%',
    borderTopWidth: 1,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
    padding: 8,
  },
  themeToggleButton: {},
  icon: {},
})
