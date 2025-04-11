import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode> I COMMENTED IT BECAUSE THIS STRICMODE WAS MAKING THE API TRIGGER TWICE
    <App />
  // </StrictMode>,
)
