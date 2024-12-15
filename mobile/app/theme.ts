import { useColorScheme } from 'react-native'

const lightColors = {
  background: 'rgb(255, 255, 255)',
  foreground: 'rgb(3, 0, 1)',
  muted: 'rgb(254, 244, 246)',
  mutedForeground: 'rgb(94, 86, 90)',
  popover: 'rgb(255, 255, 255)',
  popoverForeground: 'rgb(3, 0, 1)',
  card: 'rgb(255, 255, 255)',
  cardForeground: 'rgb(3, 0, 1)',
  border: 'rgb(242, 229, 230)',
  input: 'rgb(242, 229, 230)',
  primary: 'rgb(114, 136, 218)',
  primaryForeground: 'rgb(255, 255, 255)',
  secondary: 'rgb(249, 237, 240)',
  secondaryForeground: 'rgb(179, 150, 153)',
  accent: 'rgb(244, 212, 221)',
  accentForeground: 'rgb(91, 69, 72)',
  destructive: 'rgb(222, 51, 58)',
  destructiveForeground: 'rgb(255, 255, 255)',
}

const darkColors = {
  background: 'rgb(42, 44, 47)',
  foreground: 'rgb(255, 219, 224)',
  muted: 'rgb(33, 35, 37)',
  mutedForeground: 'rgb(155, 155, 155)',
  popover: 'rgb(33, 35, 37)',
  popoverForeground: 'rgb(255, 219, 224)',
  card: 'rgb(33, 35, 37)',
  cardForeground: 'rgb(255, 219, 224)',
  border: 'rgb(47, 47, 47)',
  input: 'rgb(63, 66, 70)',
  primary: 'rgb(114, 136, 218)',
  primaryForeground: 'rgb(255, 255, 255)',
  secondary: 'rgb(63, 66, 70)',
  secondaryForeground: 'rgb(255, 255, 255)',
  accent: 'rgb(42, 44, 47)',
  accentForeground: 'rgb(79, 143, 218)',
  destructive: 'rgb(222, 51, 58)',
  destructiveForeground: 'rgb(255, 255, 255)',
}

// Tamanhos de texto
const textSizes = {
  default: 14,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
}

// Bordas e outros estilos padrão
const borderRadius = {
  default: 8,
  rounded: 16,
  circle: 50,
}

export const useTheme = () => {
  const colorScheme = useColorScheme()

  // Retorna o tema completo com cores, tamanhos de texto e bordas
  return {
    colors: colorScheme === 'dark' ? darkColors : lightColors,
    textSizes,
    borderRadius,
  }
}
