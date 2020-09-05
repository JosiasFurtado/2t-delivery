import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'

export default (reducers: any) => {
  const persistedReducer = persistReducer(
    {
      key: '2tdelivery',
      storage: AsyncStorage,
      whitelist: ['user', 'cart', 'auth'],
    },
    reducers,
  )
  return persistedReducer
}
