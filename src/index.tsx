import React from 'react'
import { createRoot } from 'react-dom/client'

import App from '@/App'
import './styles/index.scss'

type ElementByIdType = Element | DocumentFragment

const root = createRoot(document.getElementById('root') as ElementByIdType)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
