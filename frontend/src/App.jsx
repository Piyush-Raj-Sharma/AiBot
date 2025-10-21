import { useState } from 'react'
import Chatbot from './Chatbot';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Chatbot />
    </div>
  )
}

export default App
