import React, { useEffect, useState } from 'react'
import { Animated, StyleProp, Text, ViewStyle } from 'react-native'
import { tailwind } from 'lib/styles'

interface ToastProps {
  readonly style?: StyleProp<ViewStyle>
  readonly error: string[] | null
}

const Toast: React.FC<ToastProps> = ({ style, error }) => {
  const [animationValue] = useState(new Animated.Value(-300))
  useEffect(() => startAnimation, [error])

  const startAnimation = () => {
    Animated.timing(animationValue, {
      useNativeDriver: true,
      toValue: 40,
      duration: 1500,
    }).start(() => closeToast())
  }

  const closeToast = () => {
    setTimeout(() => {
      Animated.timing(animationValue, {
        useNativeDriver: true,
        toValue: -300,
        duration: 300,
      }).start()
    }, 1000)
  }

  const transformStyle = {
    transform: [
      {
        translateY: animationValue,
      },
    ],
  }

  return error ? (
    <Animated.View
      style={[
        tailwind(
          'absolute top-0 bg-red-500 shadow-md z-50 w-5/6 flex self-center items-center justify-center rounded-full p-4 mt-8',
        ),
        style,
        transformStyle,
      ]}
    >
      {error?.map((error, index) => (
        <Text
          key={String(index)}
          style={tailwind('text-white text-sm font-bold text-left')}
        >
          - {error}
        </Text>
      ))}
    </Animated.View>
  ) : null
}

Toast.displayName = 'Toast'

export default Toast
