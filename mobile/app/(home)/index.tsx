import Header from '@/components/header'
import React from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { useTheme } from '../theme' // Ajuste o caminho conforme necessário

const recentMaintenances = [
  {
    id: '1',
    date: '2024-09-23',
    description: 'Troca de óleo',
    status: 'Concluída',
  },
  {
    id: '2',
    date: '2024-09-22',
    description: 'Ajuste de corrente',
    status: 'Em andamento',
  },
]

const stockParts = [
  { id: '1', name: 'Filtro de óleo', quantity: 10 },
  { id: '2', name: 'Pneu', quantity: 4 },
]

const Reports = () => {
  const { colors } = useTheme()

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Header title='Relatórios' />
      <Text style={[styles.title, { color: colors.foreground }]}>
        Relatórios Recentes de Manutenção
      </Text>
      {recentMaintenances.map((maintenance) => (
        <View
          key={maintenance.id}
          style={[
            styles.card,
            { borderColor: colors.border, backgroundColor: colors.card },
          ]}
        >
          <Text style={[styles.text, { color: colors.foreground }]}>
            Data: {maintenance.date}
          </Text>
          <Text style={[styles.text, { color: colors.foreground }]}>
            Descrição: {maintenance.description}
          </Text>
          <Text style={[styles.text, { color: colors.foreground }]}>
            Status: {maintenance.status}
          </Text>
        </View>
      ))}

      <Text style={[styles.title, { color: colors.foreground, marginTop: 16 }]}>
        Estoque de Peças
      </Text>
      {stockParts.map((part) => (
        <View
          key={part.id}
          style={[
            styles.card,
            { borderColor: colors.border, backgroundColor: colors.card },
          ]}
        >
          <Text style={[styles.text, { color: colors.foreground }]}>
            Peça: {part.name}
          </Text>
          <Text style={[styles.text, { color: colors.foreground }]}>
            Quantidade: {part.quantity}
          </Text>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    marginVertical: 8,
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
  },
})

export default Reports
