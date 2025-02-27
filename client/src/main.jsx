import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import TravelAgent from './TravelAgent.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <TravelAgent />
  </StrictMode>,
)
