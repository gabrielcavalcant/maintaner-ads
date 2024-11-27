import Header from '@/components/header'
import React, { useState } from 'react'
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { useTheme } from '../theme' // ajuste o caminho conforme necessário
import Input from '@/components/ui/input'
import Button from '@/components/ui/button'
import GoBack from '@/components/go-back'

const MaintenanceRequests = () => {
  const [problemDescription, setProblemDescription] = useState('')
  const [priority, setPriority] = useState('')
  const [responsible, setResponsible] = useState('')
  const [comments, setComments] = useState('')
  const [status, setStatus] = useState('pendente')

  const { colors } = useTheme()

  const handleCreateRequest = () => {
    // Lógica para criar solicitação de manutenção
    console.log({
      problemDescription,
      priority,
      responsible,
      comments,
      status,
    })
  }

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: colors.background }]}
    >
      <View>
        <GoBack />
        <View style={[styles.container]}>
          <Header title='Criar Solicitação de manutenção' />
          <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Input
              placeholder='Descrição do problema'
              value={problemDescription}
              onChangeText={setProblemDescription}
            />
            <Input
              placeholder='Prioridade (Baixa, Média, Alta)'
              value={priority}
              onChangeText={setPriority}
            />
            <Input
              placeholder='Responsável'
              value={responsible}
              onChangeText={setResponsible}
            />
            <Input
              placeholder='Adicionar comentários'
              value={comments}
              onChangeText={setComments}
            />
          </View>
          <View style={styles.statusContainer}>
            <Button
              onPress={() => setStatus('pendente')}
              size='lg'
              variant={status === 'pendente' ? 'outline' : 'ghost'}
            >
              Pendente
            </Button>
            <Button
              onPress={() => setStatus('em andamento')}
              size='lg'
              variant={status === 'em andamento' ? 'outline' : 'ghost'}
            >
              Em Andamento
            </Button>
            <Button
              onPress={() => setStatus('concluída')}
              variant={status === 'concluída' ? 'outline' : 'ghost'}
              size='lg'
            >
              Concluída
            </Button>
          </View>
          <Button onPress={handleCreateRequest} size='xl'>
            Criar Solicitação
          </Button>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 16,
  },
  container: {
    display: 'flex',
    gap: 15,
    alignItems: 'stretch',
  },
  input: {
    marginVertical: 8,
    borderWidth: 1,
    padding: 8,
  },
  statusContainer: {
    marginTop: 16,
    display: 'flex',
    gap: 10,
    marginBottom: 20,
  },
  statusText: {
    fontSize: 18,
  },
  statusButton: {
    marginVertical: 4,
    borderRadius: 8,
    padding: 10,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
})

export default MaintenanceRequests
