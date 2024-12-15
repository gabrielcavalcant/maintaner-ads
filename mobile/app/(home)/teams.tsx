import React from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { useTheme } from '../theme' // ajuste o caminho conforme necessário
import Header from '@/components/header'

const teams = [
  { id: '1', name: 'Equipe A', members: ['João', 'Maria', 'Carlos'] },
  { id: '2', name: 'Equipe B', members: ['José', 'Ana', 'Pedro'] },
]

const Teams = () => {
  const { colors } = useTheme()

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Header title='Equipes' />
      <Text style={[styles.title, { color: colors.foreground }]}>
        Equipes Disponíveis
      </Text>
      {teams.map((team) => (
        <View
          key={team.id}
          style={[
            styles.teamContainer,
            { borderColor: colors.border, backgroundColor: colors.card },
          ]}
        >
          <Text style={[styles.teamName, { color: colors.cardForeground }]}>
            Equipe: {team.name}
          </Text>
          <Text style={styles.teamMembers}>
            Membros: {team.members.join(', ')}
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
    marginBottom: 12,
  },
  teamContainer: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 8,
    borderRadius: 8,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
  },
  teamMembers: {
    fontSize: 14,
    color: 'gray',
  },
})

export default Teams
