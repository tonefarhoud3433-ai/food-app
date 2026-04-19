import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from "react-toastify"
import "react-tooltip/dist/react-tooltip.css"
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer/>
    <App />
  </StrictMode>,
)
