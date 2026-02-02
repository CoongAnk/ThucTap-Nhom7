import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// GLOBAL CSS
import './styles/reset.css'
import './styles/header.css'
import './styles/footer.css'
import './styles/style.css'
import './index.css'
import './styles/Login.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
