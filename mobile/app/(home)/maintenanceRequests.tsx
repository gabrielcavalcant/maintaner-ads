import Header from '@/components/header'
import React, { useState } from 'react'
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native'
import { useTheme } from '../theme' 
import Input from '@/components/ui/input'
import Button from '@/components/ui/button'
import GoBack from '@/components/go-back'
import { ApiRequest } from '@/lib/request.module'

const MaintenanceRequests = () => {
  const [description, setDescription] = useState('')
  const [motorcycleId, setMotorcycleId] = useState('')
  const [teamId, setTeamId] = useState('')

  const { colors } = useTheme()

  const handleCreateRequest = async () => {
    // Verifica se todos os campos estão preenchidos
    if (!description || !motorcycleId || !teamId) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos antes de enviar.')
      return
    }

    const API = new ApiRequest()

    try {
      const response = await API.ApiRequest('/maintenance', {
        description,
        motorcycleId,
        teamId,
      })

      console.log('Response Status:', response?.status)
      console.log('Response Headers:', response?.headers)
      console.log('Response Data:', response?.data)

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Sucesso', 'Solicitação de manutenção criada com sucesso!')

        // Limpa os campos após o sucesso
        setDescription('')
        setMotorcycleId('')
        setTeamId('')
      } else {
        Alert.alert('Erro', 'Algo deu errado. Verifique os dados e tente novamente.')
      }
    } catch (error) {
      console.error('Erro na requisição:', error)
      Alert.alert('Erro', 'Ocorreu um erro ao criar a solicitação. Tente novamente mais tarde.')
    }
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
              placeholder='Descrição da manutenção'
              value={description}
              onChangeText={setDescription}
            />
            <Input
              placeholder='ID da motocicleta'
              value={motorcycleId}
              onChangeText={setMotorcycleId}
            />
            <Input
              placeholder='ID da equipe responsável'
              value={teamId}
              onChangeText={setTeamId}
            />
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
})

export default MaintenanceRequests
