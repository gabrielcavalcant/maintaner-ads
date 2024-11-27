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
import { Hammer } from '@/components/icons'
import Toast from 'react-native-root-toast'
import { useTheme } from '../theme'

const formSchema = z
  .object({
    fullName: z.string().min(1, { message: 'Nome Completo é necessário.' }),
    email: z
      .string()
      .min(1, { message: 'Email necessário.' })
      .email({ message: 'Email inválido.' }),
    password: z
      .string()
      .min(3, { message: 'Senha deve ter no mínimo 3 caracteres.' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'É necessário repetir a senha.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas digitadas não coincidem.',
    path: ['confirmPassword'],
  })

export default function Page() {
  const { signUp } = useAuth()
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const theme = useTheme()

  async function handleSignin(values: z.infer<typeof formSchema>) {
    const response = await signUp(values)

    if (response.success) {
      router.replace('/')
    } else if (response.message) {
      console.error(response.error)
      Toast.show(response.message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
      })
    } else {
      Toast.show('Ocorreu um erro no servidor.', {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
      })
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Hammer color={theme.colors.primary} size={70} />
            <Text style={[styles.title, { color: theme.colors.primary }]}>
              Maintainer
            </Text>
          </View>
          <Text
            style={[styles.subtitle, { color: theme.colors.mutedForeground }]}
          >
            Nova Conta
          </Text>
          <Text
            style={[
              styles.description,
              { color: theme.colors.mutedForeground },
            ]}
          >
            Preencha o formulário abaixo para criar sua conta.
          </Text>
        </View>

        <View style={styles.form}>
          <FormField
            control={control}
            name='fullName'
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder='Nome Completo'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.fullName && (
            <Text style={{ color: theme.colors.destructive }}>
              {errors.fullName.message}
            </Text>
          )}
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
          <FormField
            control={control}
            name='confirmPassword'
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder='Confirme sua senha'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            )}
          />
          {errors.confirmPassword && (
            <Text style={{ color: theme.colors.destructive }}>
              {errors.confirmPassword.message}
            </Text>
          )}
          <Button onPress={handleSubmit(handleSignin)} size='xl'>
            Criar Conta
          </Button>
          <View style={styles.signupContainer}>
            <Text
              style={[styles.signupText, { color: theme.colors.foreground }]}
            >
              Já possui conta?
            </Text>
            <Button
              variant='link'
              onPress={() => router.replace('/(auth)/sign-in')}
            >
              Entrar
            </Button>
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
  headerContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 8,
  },
  form: {
    width: '100%',
    gap: 12,
  },
  input: {
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  signupText: {
    fontSize: 16,
    marginRight: 6,
  },
})
