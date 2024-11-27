import { useRouter } from 'expo-router'
import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native'
import React from 'react'
import { useAuth } from '@/context/authContext'
import { useForm, Controller as FormField } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Toast from 'react-native-root-toast'
import Logo from '@/components/logo'
import * as Haptics from 'expo-haptics'
import { useTheme } from '../theme'

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email necessário' })
    .email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(3, { message: 'Senha deve ter no mínimo 3 caracteres' }),
})

export default function Page() {
  const { signIn } = useAuth()
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const theme = useTheme()

  async function handleSignin(values: z.infer<typeof formSchema>) {
    const response = await signIn(values)

    if (response.success) {
      router.replace('/')
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    } else if (response.message) {
      Toast.show(response.message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
      })
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
    } else {
      Toast.show('Ocorreu um erro no servidor.', {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
      })
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        <View style={styles.formContainer}>
          <View style={styles.logoContainer}>
            <Logo />
            <Text
              style={[styles.title, { color: theme.colors.mutedForeground }]}
            >
              Login
            </Text>
            <Text
              style={[styles.subtitle, { color: theme.colors.mutedForeground }]}
            >
              Insira suas credenciais para continuar.
            </Text>
          </View>

          <View style={styles.form}>
            <FormField
              control={control}
              name='email'
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder='Email'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.email && (
              <Text style={{ color: theme.colors.destructive }}>
                {errors.email.message}
              </Text>
            )}
            <FormField
              control={control}
              name='password'
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder='Senha'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
              )}
            />
            {errors.password && (
              <Text style={{ color: theme.colors.destructive }}>
                {errors.password.message}
              </Text>
            )}
            <Button onPress={handleSubmit(handleSignin)} size='xl'>
              Entrar
            </Button>
            <View style={styles.signupContainer}>
              <Text
                style={[styles.signupText, { color: theme.colors.foreground }]}
              >
                Primeiro acesso?
              </Text>
              <Button
                variant='link'
                onPress={() => router.replace('/(auth)/sign-up')}
              >
                Criar conta
              </Button>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    paddingHorizontal: 24,
    maxWidth: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    gap: 12,
  },

  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupText: {
    fontSize: 16,
  },
})
