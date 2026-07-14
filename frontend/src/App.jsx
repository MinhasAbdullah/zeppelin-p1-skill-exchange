import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Browse from './pages/Browse'
import About from './pages/About'  // ← Add this

function isAuthenticated() {
  return localStorage.getItem('user') !== null
}

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />
  }
  return children
}

function AppRoutes() {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/about" element={<About />} />  {/* ← Add this */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return <AppRoutes />
}

export default App