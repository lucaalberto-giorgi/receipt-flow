import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { ExpensesProvider } from './context/ExpensesContext'
import Categories from './pages/Categories'
import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'
import Settings from './pages/Settings'
import UploadReceipt from './pages/UploadReceipt'

const THEME_STORAGE_KEY = 'receipt-flow-theme'
const LIGHT_THEME = 'light'
const DARK_THEME = 'dark'

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = globalThis.localStorage?.getItem(THEME_STORAGE_KEY)
    return savedTheme === DARK_THEME || savedTheme === LIGHT_THEME
      ? savedTheme
      : LIGHT_THEME
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === DARK_THEME) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME,
    )
  }

  return (
    <ExpensesProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/upload-receipt" element={<UploadReceipt />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/categories" element={<Categories />} />
            <Route
              path="/settings"
              element={
                <Settings
                  darkMode={theme === DARK_THEME}
                  onToggleDarkMode={toggleTheme}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ExpensesProvider>
  )
}

export default App
