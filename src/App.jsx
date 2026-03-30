import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { ExpensesProvider } from './context/ExpensesContext'
import Categories from './pages/Categories'
import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'
import Settings from './pages/Settings'
import UploadReceipt from './pages/UploadReceipt'

function App() {
  return (
    <ExpensesProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/upload-receipt" element={<UploadReceipt />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ExpensesProvider>
  )
}

export default App
