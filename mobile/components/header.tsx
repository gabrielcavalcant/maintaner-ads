import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '@/app/theme'

type HeaderProps = {
  title: string
}

export default function Header({ title }: HeaderProps) {
  const theme = useTheme()
  return (
    <Text
      style={[styles.title, { color: theme.colors.primary, textAlign: 'left' }]}
    >
      {title}
    </Text>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
})
