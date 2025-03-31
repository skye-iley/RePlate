import './App.css'
import { Route, Routes } from 'react-router-dom'
import Taskbar from './components/Taskbar'
import StatsAndHistoryPage from './pages/stats_and_history'
import HomePage from './pages/home'
import DonatePage from './pages/donate'

function App() {
  // Array to hold nearby locations
  
  return (
    <div>
      <Taskbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stats" element={<StatsAndHistoryPage />} />
        <Route path="/donate" element={<DonatePage />} />
      </Routes>
    </div>
  )
}

export default App
