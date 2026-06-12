import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider, theme } from 'antd'
import ruRU from 'antd/locale/ru_RU'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      locale={ruRU}
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#4ade80',
          borderRadius: 10,
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
