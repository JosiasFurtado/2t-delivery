import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const StackNavigator: React.FC = ({ children }) => {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      {children}
    </Stack.Navigator>
  )
}

StackNavigator.displayName = 'StackNavigator'

export default StackNavigator
