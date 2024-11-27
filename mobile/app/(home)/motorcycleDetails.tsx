import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useTheme } from '../theme' // Supondo que você já tenha o useTheme implementado
import Button from '@/components/ui/button'
import { ArrowLeftFromLine } from 'lucide-react-native'
import GoBack from '@/components/go-back'

const MotorcycleDetails = () => {

  // Mock dos dados da motocicleta
  const motorcycle = {
    name: 'Harley-Davidson',
    type: 'Cruiser',
    owner: 'John Doe',
  }

  // Usando o hook de tema para acessar as cores
  const theme = useTheme()

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <GoBack />
      <View style={[styles.detailsCard]}>
        <Text style={[styles.name, { color: theme.colors.foreground }]}>
          {motorcycle.name}
        </Text>
        <Text style={[styles.text, { color: theme.colors.foreground }]}>
          Tipo: {motorcycle.type}
        </Text>
        <Text style={[styles.text, { color: theme.colors.foreground }]}>
          Dono: {motorcycle.owner}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 16,
    gap: 10,
  },
  detailsCard: {
    flex: 1,
    padding: 16,
    gap: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
})

export default MotorcycleDetails
