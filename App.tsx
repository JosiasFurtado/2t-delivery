/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect } from 'react'
import { LogBox, StatusBar, Text } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Routes from './src/Routes'
import moment from 'moment'
import 'moment/locale/pt-br'
import { getColor } from './src/lib/styles'
import { store, persistor } from './src/store'
import * as Updates from 'expo-updates'

// @ts-ignore
Text.defaultProps = Text.defaultProps || {}
// @ts-ignore
Text.defaultProps.allowFontScaling = false

console.disableYellowBox = true
LogBox.ignoreAllLogs(true)

moment().locale('pt-br')
const App: React.FC = () => {
  useEffect(() => {
    async function updateApp() {
      const { isAvailable } = await Updates.checkForUpdateAsync()

      if (isAvailable) {
        await Updates.fetchUpdateAsync()
        await Updates.reloadAsync()
      }
    }
    updateApp()
  }, [])

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={getColor('primary-500')}
          hidden={false}
        />
        <Routes />
      </PersistGate>
    </Provider>
  )
}

export default App
