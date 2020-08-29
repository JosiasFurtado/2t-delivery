import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../pages/Login'
import Tutorial from '../pages/Tutorial'
import TabNavRoutes from './TabNavRoutes'
import ItemPage from '../pages/ItemPage'
import StorePage from '../pages/StorePage'
import RequestDetail from '../pages/RequestDetail'
import Help from '../pages/Help'

const Stack = createStackNavigator()

export default function StackRoutes() {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen name="Tutorial" component={Tutorial} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={TabNavRoutes} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="StorePage" component={StorePage} />
      <Stack.Screen name="ItemPage" component={ItemPage} />
      <Stack.Screen name="RequestDetail" component={RequestDetail} />
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
      <Stack.Screen
        name="MyRequests"
        component={TabNavRoutes}
        initialParams={{ initialRouteName: 'Pedidos' }}
      />
    </Stack.Navigator>
  )
}
