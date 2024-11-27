import { ActivityIndicator } from '@/components/ui/activity-indicator'
import Button from '@/components/ui/button'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'nativewind'
import { Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function Index() {
  const { colorScheme, toggleColorScheme } = useColorScheme()
  return (
    <GestureHandlerRootView>
      <View className='flex-1 items-center justify-center bg-background'>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

        <Button onPress={toggleColorScheme}>
          <Text className='text-primary-foreground'>Button</Text>
        </Button>
        <ActivityIndicator size='large' />
      </View>
    </GestureHandlerRootView>
  )
}
