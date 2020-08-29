import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Tutorial from '../pages/Tutorial'
import TabNavRoutes from './TabNavRoutes'
import ItemPage from '../pages/ItemPage'
import StorePage from '../pages/StorePage'
import RequestDetail from '../pages/RequestDetail'
import Checkout from '../pages/Checkout'
import Help from '../pages/Help'
import MyRequests from '../pages/MyRequests'

const Stack = createStackNavigator()

export default function StackRoutes() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Tutorial" component={Tutorial} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={TabNavRoutes} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="ItemPage" component={ItemPage} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen
        name="Profile"
        component={TabNavRoutes}
        initialParams={{ initialRouteName: 'Perfil' }}
      />
      <Stack.Screen
        name="Cart"
        component={TabNavRoutes}
        initialParams={{ initialRouteName: 'Carrinho' }}
      />
    </Stack.Navigator>
  )
}

export function HomeStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="StorePage" component={StorePage} />
    </Stack.Navigator>
  )
}

export function RequestStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MyRequests" component={MyRequests} />
      <Stack.Screen name="RequestDetail" component={RequestDetail} />
    </Stack.Navigator>
  )
}
