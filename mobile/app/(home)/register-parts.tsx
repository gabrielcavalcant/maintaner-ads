import React, { useState } from 'react'
import { Text, View, TextInput, ScrollView, StyleSheet } from 'react-native'
import { useTheme } from '../theme' // Supondo que você já tenha o useTheme implementado
import Input from '@/components/ui/input'
import Button from '@/components/ui/button'

const RegisterItems = () => {
  const [itemName, setItemName] = useState('')
  const [quantityUsed, setQuantityUsed] = useState('')

  const theme = useTheme()

  const handleRegisterItem = () => {
    console.log({
      itemName,
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
        Registrar Item e Materiais
      </Text>Item
      <Input
        placeholder='Nome do item'
        value={itemName}
        onChangeText={setItemName}
        placeholderTextColor={theme.colors.mutedForeground}
      />
      <Input
        placeholder='Quantidade utilizada'
        value={quantityUsed}
        onChangeText={setQuantityUsed}
        placeholderTextColor={theme.colors.mutedForeground}
        keyboardType='numeric'
      />
      <Button onPress={handleRegisterItem} size='xl'>
        Registrar Item
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

export default RegisterItems
