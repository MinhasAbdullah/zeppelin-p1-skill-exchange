import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle, LogIn } from 'lucide-react'

function SignIn() {
  const navigate = useNavigate()
  
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (form.email && form.password) {
        // Save user data in localStorage
        const userData = {
          email: form.email,
          loginTime: new Date().toISOString(),
          name: form.email.split('@')[0]
        }
        
        localStorage.setItem('user', JSON.stringify(userData))
        setIsLoading(false)
        navigate('/')
        console.log('Sign in successful:', form)
      } else {
        setError('Invalid email or password')
        setIsLoading(false)
      }
    }, 1500)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  const floatingAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-violet-50 flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Animated Background Circles */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-indigo-200/40 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-violet-200/40 blur-3xl"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white/90 backdrop-blur-sm w-full max-w-md rounded-3xl shadow-2xl shadow-purple-900/10 p-8 border border-white/50 relative"
      >
        {/* Back Button */}
        <motion.div variants={itemVariants}>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-violet-600 transition-colors text-sm font-medium group"
          >
            <motion.span
              whileHover={{ x: -3 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowLeft size={16} />
            </motion.span>
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mt-4 mb-8">
          <motion.div
            animate={floatingAnimation}
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/30 mx-auto mb-4"
          >
            <LogIn size={24} />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Log in to continue your learning journey</p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm mb-4"
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div variants={itemVariants}>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5">Email Address</label>
            <div className="relative group">
              <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-600 transition-colors" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5">Password</label>
            <div className="relative group">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-600 transition-colors" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl pl-11 pr-12 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${rememberMe ? 'bg-violet-600 border-violet-600' : 'border-gray-300 group-hover:border-violet-400'}`}>
                  {rememberMe && <CheckCircle size={14} className="text-white" />}
                </div>
              </div>
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
            </label>
            <a href="#" className="text-sm text-violet-600 hover:text-violet-700 font-medium transition-colors hover:underline">
              Forgot password?
            </a>
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="relative w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
          >
            <span className={`flex items-center justify-center gap-2 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
              Log In
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}
          </motion.button>
        </form>

        <motion.p variants={itemVariants} className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-violet-600 font-semibold hover:text-violet-700 transition-colors hover:underline">
            Create one now
          </Link>
        </motion.p>
      </motion.div>
    </div>
  )
}

export default SignIn