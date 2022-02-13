import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TasksProvider } from './contexts/TasksContext'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <TasksProvider>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
        </Routes>
      </TasksProvider>
    </BrowserRouter>
  )
}

export default App
