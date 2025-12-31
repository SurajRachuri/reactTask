import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { ColorPicker } from './ColorPicker'
import TextInput from './TextInput'
import TodoList from './TodoList'
import TabsPage from './TabsPage'


function HomePage() {
  const [count, setCount] = useState(0)
  const [Visible, setVisible] = useState("none")

  function CountPluse() {
    setCount((count) => count + 1)
  }

  function CountMinus() {
    setCount((count) => (count > 0 ? count - 1 : count))
  }

  function DataView() {
    setVisible((Visible) => {
      if (Visible == "none") {
        return "block"
      } else {
        return "none"
      }
    })
  }

  return (
    <div className="counter-section">
      <h1>Task 1.1: Counter Component</h1>
      <h2 className="counter-title">Counter</h2>
      <p className="counter-display">{count}</p>
      <div className="counter-buttons">
        <button className="counter-btn" onClick={CountPluse}>+</button>
        <button className="counter-btn" onClick={CountMinus}>-</button>
      </div>
      <hr /><br />

      <h1>Task 1.2: Toggle Visibility</h1>
      <p
        className="animated-text"
        style={{
          opacity: Visible === "block" ? 0 : 1,
          transform: Visible === "none" ? "translateY(-10px)" : "translateY(0)",
          pointerEvents: Visible === "none" ? "none" : "auto"
        }}
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae rem aliquam, modi aut aspernatur provident similique!
      </p>
      <button className="toggle-btn" onClick={DataView}>Toggle Text</button>
      <hr /><br />

      <h1>Task 1.3: Simple Form Input</h1>
      <TextInput />
      <hr /><br />

      <h1>Task 1.4: Color Picker</h1>
      <ColorPicker />
      <hr /><br />

      <h1>Task 1.5: Todo List (Basic)</h1>
      <TodoList />
     
      <hr /><br />


      <Link style={{textDecoration:"none"}} to="/tabs" className="toggle-btn">Go to Tabs Page</Link>
    </div>
  )
}

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tabs" element={<TabsPage />} />
      </Routes>
    </div>
  )
}

export default App

