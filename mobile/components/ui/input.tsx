import { useTheme } from '@/app/theme'
import React from 'react'
import { TextInput, TextInputProps, StyleSheet } from 'react-native'

export interface InputProps extends TextInputProps {}

export default function Input(props: InputProps) {
  const theme = useTheme()
  return (
    <TextInput
      style={[
        styles.input,
        {
          color: theme.colors.cardForeground,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.card,
          fontSize: theme.textSizes.md,
          borderRadius: theme.borderRadius.rounded,
        },
      ]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    display: 'flex',
    height: 56,
    width: '100%',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 18,
  },
})
