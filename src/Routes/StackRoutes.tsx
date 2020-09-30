import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import StackNavigator from './StackNavigator'

import Login from '../pages/Login'
import Home from '../pages/Home'
import Tutorial from '../pages/Tutorial'
import TabNavRoutes from './TabNavRoutes'
import ItemPage from '../pages/ItemPage'
import StorePage from '../pages/StorePage'
import StoreDetailsPage from '../pages/StoreDetailsPage'
import RequestDetail from '../pages/RequestDetail'
import Checkout from '../pages/Checkout'
import StoreFiltersPage from '../pages/StoreFiltersPage'
import MyRequests from '../pages/MyRequests'
import InitialAddress from '../pages/InitialAddress'
import Profile from '../pages/Profile'

const Stack = createStackNavigator()

export default function StackRoutes() {
  return (
    <StackNavigator>
      <Stack.Screen name="Tutorial" component={Tutorial} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="InitialAddress" component={InitialAddress} />
      <Stack.Screen name="Home" component={TabNavRoutes} />
      <Stack.Screen name="ItemPage" component={ItemPage} />
      <Stack.Screen name="Checkout" component={Checkout} />
    </StackNavigator>
  )
}

export function HomeStack() {
  return (
    <StackNavigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="StorePage" component={StorePage} />
      <Stack.Screen name="StoreDetailsPage" component={StoreDetailsPage} />
      <Stack.Screen name="StoreFiltersPage" component={StoreFiltersPage} />
    </StackNavigator>
  )
}

export function RequestStack() {
  return (
    <StackNavigator>
      <Stack.Screen name="MyRequests" component={MyRequests} />
      <Stack.Screen name="RequestDetail" component={RequestDetail} />
    </StackNavigator>
  )
}

export function ProfileStack() {
  return (
    <StackNavigator>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Tutorial" component={Tutorial} />
    </StackNavigator>
  )
}
