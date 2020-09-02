import React from 'react'
import { StatusBar, Text } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Routes from './src/Routes'
import moment from 'moment'
import 'moment/locale/pt-br'
import { getColor } from 'lib/styles'
import { store, persistor } from 'store'

// @ts-ignore
Text.defaultProps = Text.defaultProps || {}
// @ts-ignore
Text.defaultProps.allowFontScaling = false

//console.disableYellowBox = true

const App: React.FC = () => {
  moment().locale('pt-br')
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
