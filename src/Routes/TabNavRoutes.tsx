import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Profile from '../pages/Profile'
import { MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'

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
      tabBarOptions={{
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
        component={Home}
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
