import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../pages/Login'
import TabNavRoutes from './TabNavRoutes'

const Stack = createStackNavigator()

export default function StackRoutes() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={TabNavRoutes} />
    </Stack.Navigator>
  )
}
