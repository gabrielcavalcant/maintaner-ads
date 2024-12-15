import { View, Text } from 'react-native'
import React from 'react'
import Button from './ui/button'
import { ArrowLeftFromLine } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import { useTheme } from '@/app/theme'

export default function GoBack() {
  const router = useRouter()
  const theme = useTheme()

  return (
    <View>
      <Button onPress={() => router.back()} type='icon' variant='ghost'>
        <ArrowLeftFromLine
          color={theme.colors.primary}
          size={theme.textSizes.xl}
        />
        <Text
          style={{
            color: theme.colors.primary,
            fontSize: theme.textSizes.xl,
          }}
        >
          Voltar
        </Text>
      </Button>
    </View>
  )
}
