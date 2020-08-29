import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Cart from '../pages/Cart'
import Profile from '../pages/Profile'
import {
  MaterialIcons,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from '@expo/vector-icons'
import { HomeStack, RequestStack } from './StackRoutes'

interface TabNavRoutesProps {
  readonly route?: {
    params?: any
  }
}
const Tab = createMaterialTopTabNavigator()

const TabNavRoutes: React.FC<TabNavRoutesProps> = ({ route }) => {
  const initialRoute = route?.params && route.params.initialRouteName
  return (
    <Tab.Navigator
      removeClippedSubviews={true}
      tabBarOptions={{
        allowFontScaling: false,
        showIcon: true,
        showLabel: false,
        labelStyle: { fontSize: 10 },
        style: { backgroundColor: '#FBFBFB' },
        indicatorStyle: { backgroundColor: '#019853' },
      }}
      tabBarPosition="bottom"
      initialRouteName={initialRoute ? initialRoute : 'Início'}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome
                name="home"
                size={focused ? 28 : 25}
                color={focused ? '#000' : '#d3d3d3'}
              />
            )
          },
        }}
        name="Início"
        component={HomeStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome5
                name="shopping-cart"
                size={focused ? 22 : 20}
                color={focused ? '#000' : '#d3d3d3'}
              />
            )
          },
        }}
        name="Carrinho"
        component={Cart}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="md-list-box"
                size={focused ? 28 : 25}
                color={focused ? '#000' : '#d3d3d3'}
              />
            )
          },
        }}
        name="Pedidos"
        component={RequestStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="account-circle"
                size={focused ? 26 : 25}
                color={focused ? '#000' : '#d3d3d3'}
              />
            )
          },
        }}
        name="Perfil"
        component={Profile}
      />
    </Tab.Navigator>
  )
}

export default TabNavRoutes
