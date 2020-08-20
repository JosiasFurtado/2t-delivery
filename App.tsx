import React from 'react'
import { StatusBar, Text } from 'react-native'
import Routes from './src/Routes'
import moment from 'moment'
import 'moment/locale/pt-br'

Text.defaultProps = Text.defaultProps || {}
Text.defaultProps.allowFontScaling = false

// console.disableYellowBox = true

const App: React.FC = () => {
  moment().locale('pt-br')
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#019853"
        hidden={false}
      />
      <Routes />
    </>
  )
}

export default App
