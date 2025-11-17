import React from 'react'
import { Provider } from 'react-redux'
import ApiData from './Component/ApiData.jsx'
import { store } from './App/Store'

export default function App() {
  return (
    <Provider store={store}>
      <ApiData />
    </Provider>
  )
}
