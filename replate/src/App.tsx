import './App.css'
import { Route, Routes } from 'react-router-dom'
import Taskbar from './components/Taskbar'
import StatsAndHistoryPage from './pages/stats_and_history'
import HomePage from './pages/home'

function App() {
  // Array to hold nearby locations
  
  return (
    <div>
      <Taskbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stats" element={<StatsAndHistoryPage />} />
      </Routes>
    </div>
  )
}

export default App
