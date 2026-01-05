import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserList from './userList'
import SearchableList from './SearchFilter.jsx'
import NavBar from './NavBar.jsx'
import { Routes, Route } from 'react-router-dom';
import RegistrationForm from './FormwithValidation.jsx'
import ShoppingCart from './ShoppingCart.jsx'
import Stopwatch from './StopWatch.jsx'
import Modal from './Model.jsx'
import ModalUsage from './ModalUsage.jsx'
import WeatherApp from './WeatherApp.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <Modal/>
      <Routes>
        <Route path='/' element={<UserList />} />
        <Route path="/userList" element={<UserList />} />
        <Route path="/SearchFilter" element={<SearchableList />} />
        <Route path="/FormValidation" element={<RegistrationForm />} />
        <Route path="/ShoppingCart" element={<ShoppingCart />} />
        <Route path="/StopWatch" element={<Stopwatch />} />
        <Route path="/Model" element={<ModalUsage/>} />
        <Route path="/Weather" element={<WeatherApp/>} />
      </Routes>

    </>
  )
}

export default App
