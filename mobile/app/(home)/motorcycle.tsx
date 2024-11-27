import { useRouter } from 'expo-router'
import React from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../theme'
import Header from '@/components/header'

const motorcycles = [
  { id: '1', name: 'Honda CB500', type: 'Street', owner: 'Gustavo' },
  { id: '2', name: 'Yamaha NMax', type: 'Scooter', owner: 'Carlos' },
  { id: '3', name: 'Kawasaki KX250', type: 'Motocross', owner: 'Julia' },
  { id: '4', name: 'Honda CB500', type: 'Street', owner: 'Gustavo' },
  { id: '5', name: 'Yamaha NMax', type: 'Scooter', owner: 'Carlos' },
  { id: '6', name: 'Kawasaki KX250', type: 'Motocross', owner: 'Julia' },
  { id: '7', name: 'Honda CB500', type: 'Street', owner: 'Gustavo' },
  { id: '8', name: 'Yamaha NMax', type: 'Scooter', owner: 'Carlos' },
  { id: '9', name: 'Kawasaki KX250', type: 'Motocross', owner: 'Julia' },
  { id: '10', name: 'Honda CB500', type: 'Street', owner: 'Gustavo' },
  { id: '11', name: 'Yamaha NMax', type: 'Scooter', owner: 'Carlos' },
  { id: '12', name: 'Kawasaki KX250', type: 'Motocross', owner: 'Julia' },
]

export default function Motorcycle() {
  const theme = useTheme() // Usa o tema dinâmico
  const router = useRouter()

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => router.navigate('/(home)/motorcycleDetails')}
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <View style={styles.cardContent}>
        <Text style={[styles.name, { color: theme.colors.foreground }]}>
          {item.name}
        </Text>
        <Text style={[styles.type, { color: theme.colors.mutedForeground }]}>
          {item.type}
        </Text>
        <Text style={[styles.owner, { color: theme.colors.mutedForeground }]}>
          {item.owner}
        </Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Header title='Motocicletas' />

      <FlatList
        data={motorcycles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4, // Para Android
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
  },
  type: {
    flex: 1,
    textAlign: 'center',
  },
  owner: {
    flex: 1,
    textAlign: 'center',
  },
})
