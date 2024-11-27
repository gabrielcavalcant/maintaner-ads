import { useTheme } from '@/app/theme'
import React, { ReactNode } from 'react'
import { Text, View, ViewProps, StyleSheet } from 'react-native'
import {
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native-gesture-handler'

interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode
  viewProps?: ViewProps
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  type?: 'default' | 'icon'
  onPress?: () => void
}

export default function Button({
  children,
  viewProps,
  size = 'default',
  type = 'default',
  variant = 'default',
  ...props
}: ButtonProps) {
  const theme = useTheme()

  const variantStyles = {
    default: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.primaryForeground,
      borderColor: theme.colors.muted,
    },
    destructive: {
      backgroundColor: theme.colors.destructive,
      color: theme.colors.destructiveForeground,
      borderColor: theme.colors.muted,
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: theme.colors.primary,
      color: theme.colors.primary,
    },
    secondary: {
      backgroundColor: theme.colors.secondary,
      color: theme.colors.secondaryForeground,
      borderColor: theme.colors.muted,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: theme.colors.foreground,
    },
    link: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: theme.colors.foreground,
    },
  }

  const sizeStyles = {
    default: styles.defaultSize,
    sm: styles.smallSize,
    md: styles.mediumSize,
    lg: styles.largeSize,
    xl: styles.xlargeSize,
    '2xl': styles.xxlargeSize,
  }

  return (
    <TouchableOpacity
      style={{ alignItems: 'center', justifyContent: 'center' }}
      {...props}
    >
      <View
        {...viewProps}
        style={[
          styles.button,
          variantStyles[variant],
          variant !== 'ghost' && {
            borderWidth: 1,
            borderColor: variantStyles[variant].borderColor,
          },
          { borderRadius: theme.borderRadius.default },
        ]}
      >
        {type !== 'icon' ? (
          <Text
            style={{
              color: variantStyles[variant].color,
              fontSize: theme.textSizes[size],
              textAlign: 'center',
            }}
          >
            {children}
          </Text>
        ) : (
          <View style={styles.iconContainer}>{children}</View>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Para Android
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  defaultSize: {
    fontSize: 18,
  },
  smallSize: {
    fontSize: 14,
  },
  mediumSize: {
    fontSize: 16,
  },
  largeSize: {
    fontSize: 20,
  },
  xlargeSize: {
    fontSize: 24,
  },
  xxlargeSize: {
    fontSize: 28,
  },
})
