import React, { useState } from 'react'
import { Text, View, TextInput, ScrollView, StyleSheet } from 'react-native'
import { useTheme } from '../theme' // Supondo que você já tenha o useTheme implementado
import Input from '@/components/ui/input'
import Button from '@/components/ui/button'

const RegisterParts = () => {
  const [partName, setPartName] = useState('')
  const [quantityUsed, setQuantityUsed] = useState('')

  const theme = useTheme()

  const handleRegisterPart = () => {
    console.log({
      partName,
      quantityUsed,
    })
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text
        style={[
          styles.title,
          { color: theme.colors.foreground, fontSize: theme.textSizes['3xl'] },
        ]}
      >
        Registrar Peças e Materiais
      </Text>
      <Input
        placeholder='Nome da peça'
        value={partName}
        onChangeText={setPartName}
        placeholderTextColor={theme.colors.mutedForeground}
      />
      <Input
        placeholder='Quantidade utilizada'
        value={quantityUsed}
        onChangeText={setQuantityUsed}
        placeholderTextColor={theme.colors.mutedForeground}
        keyboardType='numeric'
      />
      <Button onPress={handleRegisterPart} size='xl'>
        Registrar Peça
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
})

export default RegisterParts
