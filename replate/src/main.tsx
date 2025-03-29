import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import NearbyDonationsList from './components/nearby_donators.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <NearbyDonationsList />
  </StrictMode>,
)
