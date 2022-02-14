import React from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import { TasksProvider } from './contexts/TasksContext'
import Home from './pages/Home'

function App() {
  return (
    <HashRouter>
      <TasksProvider>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
        </Routes>
      </TasksProvider>
    </HashRouter>
  )
}

export default App
