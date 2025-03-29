import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
  const [count, setCount] = useState(0)

  const doNothing = () => {
    void(0);
  }
  // Array to hold nearby locations
  
  
  return (
    <>
      <div className = "Taskbar">
        
      </div>
      <h1>HEADER</h1>
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
