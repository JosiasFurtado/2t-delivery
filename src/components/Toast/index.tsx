import React, { useEffect, useState } from 'react'
import { Animated, StyleProp, Text, ViewStyle } from 'react-native'
import { tailwind } from 'lib/styles'
import { useSelector } from 'react-redux'
import { RootState } from 'store/modules/rootReducer'

interface ToastProps {
  readonly style?: StyleProp<ViewStyle>
}

const Toast: React.FC<ToastProps> = ({ style }) => {
  const { error } = useSelector((state: RootState) => state.auth)
  const [animationValue, setAnimationValue] = useState(new Animated.Value(-300))
  useEffect(() => startAnimation, [error])

  const startAnimation = () => {
    Animated.timing(animationValue, {
      useNativeDriver: true,
      toValue: 40,
      duration: 500,
    }).start(() => {
      setAnimationValue(new Animated.Value(-300))
    })
  }

  const transformStyle = {
    transform: [
      {
        translateY: animationValue,
      },
    ],
  }


  return (
    error ? (
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
  )
}

Toast.displayName = 'Toast'

export default Toast

