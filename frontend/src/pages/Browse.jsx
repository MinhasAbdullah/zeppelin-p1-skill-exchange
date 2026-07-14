import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, Filter, MapPin, Star, 
  X, SlidersHorizontal, Heart,
  Clock, Calendar, Award, Users, BookOpen,
  ChevronDown, ChevronUp, Shield, Sparkles,
  Bookmark, MessageCircle, Eye, ThumbsUp,
  Briefcase, GraduationCap, Home, Music,
  Code, Palette, Dumbbell, Languages, Wrench,
  Coffee, Utensils, Globe, Camera, Book
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Pakistani Data with more listings
const allListings = [
  { 
    id: 1,
    type: 'offer',
    title: "Learn Guitar - Beginner to Advanced",
    description: "Professional guitar lessons with 7+ years of teaching experience. Learn chords, strumming, and your favorite songs.",
    teacher: "Usman Khan",
    location: "Gulshan-e-Iqbal, Karachi",
    distance: 3.5,
    availability: "Weekends & Evenings",
    category: "Music",
    rating: 4.9,
    reviews: 156,
    price: "Free",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop",
    level: "All Levels",
    tags: ["Guitar", "Acoustic", "Music Theory", "Rock"],
    safety: true,
    saved: false,
    date: "2024-01-15",
    students: 45,
    experience: "7+ years"
  },
  { 
    id: 2,
    type: 'request',
    title: "Need React.js Developer Mentor",
    description: "Looking for an experienced React developer to help me understand hooks, state management, and build a portfolio project.",
    teacher: "Ayesha Malik",
    location: "DHA Phase 8, Lahore",
    distance: 2.8,
    availability: "Weekdays Evenings",
    category: "Programming",
    rating: 4.8,
    reviews: 89,
    price: "Free",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    level: "Intermediate",
    tags: ["React", "JavaScript", "Frontend", "Redux"],
    safety: true,
    saved: false,
    date: "2024-01-14",
    students: 12,
    experience: "2+ years"
  },
  { 
    id: 3,
    type: 'offer',
    title: "Home Repair & Maintenance Services",
    description: "Expert in plumbing, electrical work, and general home maintenance. Fast and reliable service.",
    teacher: "Ahmed Raza",
    location: "Gulberg, Lahore",
    distance: 4.2,
    availability: "Flexible Hours",
    category: "Home Repair",
    rating: 4.7,
    reviews: 67,
    price: "Free",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
    level: "All Levels",
    tags: ["Plumbing", "Electrical", "Carpentry", "Maintenance"],
    safety: true,
    saved: false,
    date: "2024-01-13",
    students: 28,
    experience: "10+ years"
  },
  { 
    id: 4,
    type: 'request',
    title: "Learn Italian Language",
    description: "Looking for a native Italian speaker or experienced tutor for language exchange and conversation practice.",
    teacher: "Sofia Ahmed",
    location: "Clifton, Karachi",
    distance: 1.5,
    availability: "Flexible",
    category: "Language",
    rating: 4.6,
    reviews: 45,
    price: "Free",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
    level: "Beginner",
    tags: ["Italian", "Language Exchange", "Conversation"],
    safety: true,
    saved: false,
    date: "2024-01-12",
    students: 8,
    experience: "3+ years"
  },
  { 
    id: 5,
    type: 'offer',
    title: "Yoga & Wellness Training",
    description: "Certified yoga instructor offering personalized sessions for flexibility, strength, and mental wellness.",
    teacher: "Zara Hussain",
    location: "E-11, Islamabad",
    distance: 6.0,
    availability: "Morning & Evening",
    category: "Fitness",
    rating: 4.9,
    reviews: 78,
    price: "Free",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    level: "All Levels",
    tags: ["Yoga", "Meditation", "Wellness", "Flexibility"],
    safety: true,
    saved: false,
    date: "2024-01-11",
    students: 34,
    experience: "5+ years"
  },
  { 
    id: 6,
    type: 'offer',
    title: "Graphic Design & UI/UX Mentorship",
    description: "Professional designer with 6 years experience in Adobe Creative Suite, UI/UX, and brand identity design.",
    teacher: "Hamza Ali",
    location: "Bahria Town, Rawalpindi",
    distance: 7.8,
    availability: "Weekends",
    category: "Design",
    rating: 4.8,
    reviews: 56,
    price: "Free",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    level: "Intermediate",
    tags: ["Photoshop", "Illustrator", "Figma", "UI/UX"],
    safety: true,
    saved: false,
    date: "2024-01-10",
    students: 19,
    experience: "6+ years"
  },
  { 
    id: 7,
    type: 'offer',
    title: "Cooking & Baking Classes",
    description: "Learn traditional Pakistani cuisine and international dishes. From biryani to baking, hands-on experience.",
    teacher: "Fatima Sheikh",
    location: "Model Town, Lahore",
    distance: 3.0,
    availability: "Weekends",
    category: "Cooking",
    rating: 4.9,
    reviews: 92,
    price: "Free",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop",
    level: "All Levels",
    tags: ["Pakistani Cuisine", "Baking", "International", "Cooking"],
    safety: true,
    saved: false,
    date: "2024-01-09",
    students: 52,
    experience: "8+ years"
  },
  { 
    id: 8,
    type: 'request',
    title: "Need Python Programming Tutor",
    description: "Looking for someone to teach Python from basics to data analysis and automation.",
    teacher: "Bilal Ahmed",
    location: "G-10, Islamabad",
    distance: 5.2,
    availability: "Evenings",
    category: "Programming",
    rating: 4.7,
    reviews: 34,
    price: "Free",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
    level: "Beginner",
    tags: ["Python", "Data Analysis", "Automation", "Programming"],
    safety: true,
    saved: false,
    date: "2024-01-08",
    students: 6,
    experience: "1+ years"
  },
  { 
    id: 9,
    type: 'offer',
    title: "Urdu & English Language Tutoring",
    description: "Professional language instructor teaching Urdu and English for all levels. Focus on speaking, writing, and comprehension.",
    teacher: "Dr. Samina Khan",
    location: "PECHS, Karachi",
    distance: 2.0,
    availability: "Flexible",
    category: "Language",
    rating: 4.9,
    reviews: 110,
    price: "Free",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop",
    level: "All Levels",
    tags: ["Urdu", "English", "Language Teaching", "Communication"],
    safety: true,
    saved: false,
    date: "2024-01-07",
    students: 67,
    experience: "12+ years"
  },
  { 
    id: 10,
    type: 'offer',
    title: "Web Development Bootcamp",
    description: "Full-stack web development mentorship. HTML, CSS, JavaScript, Node.js, and MongoDB.",
    teacher: "Haris Javed",
    location: "Johar Town, Lahore",
    distance: 4.5,
    availability: "Weekends",
    category: "Programming",
    rating: 4.8,
    reviews: 78,
    price: "Free",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
    level: "Beginner",
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"],
    safety: true,
    saved: false,
    date: "2024-01-06",
    students: 41,
    experience: "5+ years"
  },
  { 
    id: 11,
    type: 'request',
    title: "Need Photography Mentor",
    description: "Looking for a professional photographer to teach composition, lighting, and post-processing.",
    teacher: "Sana Mirza",
    location: "Defence, Karachi",
    distance: 1.8,
    availability: "Weekends",
    category: "Design",
    rating: 4.6,
    reviews: 23,
    price: "Free",
    image: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=400&h=300&fit=crop",
    level: "Beginner",
    tags: ["Photography", "Lighting", "Composition", "Editing"],
    safety: true,
    saved: false,
    date: "2024-01-05",
    students: 4,
    experience: "2+ years"
  },
  { 
    id: 12,
    type: 'offer',
    title: "Fitness & Personal Training",
    description: "Certified personal trainer offering customized workout plans, nutrition guidance, and fitness motivation.",
    teacher: "Imran Sheikh",
    location: "F-7, Islamabad",
    distance: 3.8,
    availability: "Morning & Evening",
    category: "Fitness",
    rating: 4.9,
    reviews: 65,
    price: "Free",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
    level: "All Levels",
    tags: ["Fitness", "Nutrition", "Workout", "Health"],
    safety: true,
    saved: false,
    date: "2024-01-04",
    students: 38,
    experience: "6+ years"
  }
]

const categories = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'programming', label: 'Programming', icon: Code },
  { id: 'design', label: 'Design', icon: Palette },
  { id: 'fitness', label: 'Fitness', icon: Dumbbell },
  { id: 'language', label: 'Language', icon: Languages },
  { id: 'home-repair', label: 'Home Repair', icon: Wrench },
  { id: 'cooking', label: 'Cooking', icon: Utensils }
]

const types = [
  { id: 'all', label: 'All Types', icon: Sparkles },
  { id: 'offer', label: 'Offers', icon: ThumbsUp },
  { id: 'request', label: 'Requests', icon: MessageCircle }
]

const sortOptions = [
  { id: 'newest', label: 'Newest First' },
  { id: 'popular', label: 'Most Popular' },
  { id: 'rating', label: 'Top Rated' },
  { id: 'distance', label: 'Nearest First' },
  { id: 'students', label: 'Most Students' }
]

function Browse() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredListings, setFilteredListings] = useState(allListings)
  const [sortBy, setSortBy] = useState('newest')
  const [savedItems, setSavedItems] = useState([])
  const [selectedDistance, setSelectedDistance] = useState('all')
  const itemsPerPage = 6

  // Filter listings
  useEffect(() => {
    let results = allListings

    // Search filter
    if (searchTerm) {
      results = results.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      results = results.filter(item => 
        item.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // Type filter
    if (selectedType !== 'all') {
      results = results.filter(item => item.type === selectedType)
    }

    // Distance filter
    if (selectedDistance !== 'all') {
      const maxDistance = parseInt(selectedDistance)
      results = results.filter(item => item.distance <= maxDistance)
    }

    // Sort
    if (sortBy === 'newest') {
      results = [...results].sort((a, b) => new Date(b.date) - new Date(a.date))
    } else if (sortBy === 'popular') {
      results = [...results].sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'rating') {
      results = [...results].sort((a, b) => b.reviews - a.reviews)
    } else if (sortBy === 'distance') {
      results = [...results].sort((a, b) => a.distance - b.distance)
    } else if (sortBy === 'students') {
      results = [...results].sort((a, b) => b.students - a.students)
    }

    setFilteredListings(results)
    setCurrentPage(1)
  }, [searchTerm, selectedCategory, selectedType, sortBy, selectedDistance])

  const totalPages = Math.ceil(filteredListings.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentListings = filteredListings.slice(startIndex, endIndex)

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedType('all')
    setSortBy('newest')
    setSelectedDistance('all')
  }

  const toggleSave = (id) => {
    setSavedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const CategoryIcon = ({ categoryId }) => {
    const cat = categories.find(c => c.id === categoryId)
    return cat ? <cat.icon size={14} /> : null
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Browse Listings</h1>
              <p className="text-gray-500 mt-1">Find skills to learn or people to connect with</p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search skills, teachers, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden p-2.5 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition"
              >
                <SlidersHorizontal size={18} />
              </button>
            </div>
          </div>

          {/* Filters - Desktop */}
          <div className="hidden lg:flex flex-wrap items-center gap-3 mt-4">
            {/* Category Filter */}
            <div className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
              <Filter size={14} className="text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-sm focus:outline-none text-gray-700 py-1"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-transparent text-sm focus:outline-none text-gray-700 py-1"
              >
                {types.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Distance Filter */}
            <div className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
              <MapPin size={14} className="text-gray-400" />
              <select
                value={selectedDistance}
                onChange={(e) => setSelectedDistance(e.target.value)}
                className="bg-transparent text-sm focus:outline-none text-gray-700 py-1"
              >
                <option value="all">All Distances</option>
                <option value="2">Within 2 km</option>
                <option value="5">Within 5 km</option>
                <option value="10">Within 10 km</option>
                <option value="20">Within 20 km</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
              <span className="text-sm text-gray-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-sm focus:outline-none text-gray-700 font-medium py-1"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-gray-50 rounded-xl border border-gray-200 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition ${viewMode === 'grid' ? 'bg-violet-100 text-violet-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                  <div className="bg-current rounded-sm w-1.5 h-1.5"></div>
                  <div className="bg-current rounded-sm w-1.5 h-1.5"></div>
                  <div className="bg-current rounded-sm w-1.5 h-1.5"></div>
                  <div className="bg-current rounded-sm w-1.5 h-1.5"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition ${viewMode === 'list' ? 'bg-violet-100 text-violet-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <div className="flex flex-col gap-0.5 w-4 h-4">
                  <div className="bg-current rounded-sm w-full h-1"></div>
                  <div className="bg-current rounded-sm w-full h-1"></div>
                  <div className="bg-current rounded-sm w-full h-1"></div>
                </div>
              </button>
            </div>

            {(searchTerm || selectedCategory !== 'all' || selectedType !== 'all' || selectedDistance !== 'all') && (
              <button
                onClick={clearFilters}
                className="text-sm text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1"
              >
                <X size={14} />
                Clear filters
              </button>
            )}
          </div>

          {/* Mobile Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden mt-4 space-y-3"
              >
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  {types.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>

                <select
                  value={selectedDistance}
                  onChange={(e) => setSelectedDistance(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <option value="all">All Distances</option>
                  <option value="2">Within 2 km</option>
                  <option value="5">Within 5 km</option>
                  <option value="10">Within 10 km</option>
                  <option value="20">Within 20 km</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </select>

                <button
                  onClick={clearFilters}
                  className="w-full text-center text-sm text-violet-600 font-medium py-2 border border-violet-200 rounded-xl hover:bg-violet-50 transition"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-700">{filteredListings.length}</span> results
          </p>
          {filteredListings.length > 0 && (
            <p className="text-sm text-gray-400">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>

        {filteredListings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">No listings found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-violet-600 font-medium hover:underline inline-flex items-center gap-1"
            >
              <X size={14} />
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
              : 'space-y-4'
            }>
              {currentListings.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                >
                  {viewMode === 'grid' ? (
                    // Grid View
                    <>
                      <div className="p-6">
                        {/* Type Badge */}
                        <div className="flex items-center justify-between mb-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                            item.type === 'offer' 
                              ? 'bg-emerald-50 text-emerald-700' 
                              : 'bg-blue-50 text-blue-700'
                          }`}>
                            {item.type === 'offer' ? (
                              <ThumbsUp size={12} />
                            ) : (
                              <MessageCircle size={12} />
                            )}
                            {item.type === 'offer' ? 'Offer' : 'Request'}
                          </span>
                          <button
                            onClick={() => toggleSave(item.id)}
                            className={`p-1.5 rounded-lg transition ${
                              savedItems.includes(item.id) 
                                ? 'text-rose-500 bg-rose-50' 
                                : 'text-gray-300 hover:text-rose-500 hover:bg-rose-50'
                            }`}
                          >
                            <Heart size={18} fill={savedItems.includes(item.id) ? 'currentColor' : 'none'} />
                          </button>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-gray-900 mb-1.5 line-clamp-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{item.description}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {item.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                          {item.tags.length > 3 && (
                            <span className="px-2.5 py-0.5 bg-gray-100 text-gray-400 text-xs rounded-full">
                              +{item.tags.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Location & Distance */}
                        <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin size={14} className="text-violet-500 flex-shrink-0" />
                            {item.location}
                          </span>
                          <span className="flex items-center gap-1 bg-violet-50 text-violet-600 px-2 py-0.5 rounded-full text-xs font-medium">
                            {item.distance} km
                          </span>
                        </div>

                        {/* Category & Availability */}
                        <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1 bg-gray-50 px-2.5 py-0.5 rounded-full text-xs">
                            <CategoryIcon categoryId={item.category.toLowerCase()} />
                            {item.category}
                          </span>
                          <span className="flex items-center gap-1 text-xs">
                            <Calendar size={12} />
                            {item.availability}
                          </span>
                        </div>

                        {/* Teacher & Rating */}
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                              {item.teacher.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{item.teacher}</p>
                              <div className="flex items-center gap-1">
                                <Star size={13} className="text-amber-400 fill-amber-400" />
                                <span className="text-sm font-semibold text-gray-700">{item.rating}</span>
                                <span className="text-xs text-gray-400">({item.reviews})</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button className="px-3 py-1.5 bg-violet-600 text-white text-xs font-semibold rounded-lg hover:bg-violet-700 transition shadow-sm hover:shadow-md">
                              Message
                            </button>
                            <button className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                              <Bookmark size={14} className="text-gray-500" />
                            </button>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Users size={12} />
                            {item.students} students
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase size={12} />
                            {item.experience}
                          </span>
                          <span className="flex items-center gap-1">
                            <Shield size={12} className="text-emerald-500" />
                            Verified
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    // List View
                    <div className="flex flex-col sm:flex-row p-6">
                      <div className="flex-1">
                        {/* Type Badge */}
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                            item.type === 'offer' 
                              ? 'bg-emerald-50 text-emerald-700' 
                              : 'bg-blue-50 text-blue-700'
                          }`}>
                            {item.type === 'offer' ? (
                              <ThumbsUp size={12} />
                            ) : (
                              <MessageCircle size={12} />
                            )}
                            {item.type === 'offer' ? 'Offer' : 'Request'}
                          </span>
                          <button
                            onClick={() => toggleSave(item.id)}
                            className={`p-1.5 rounded-lg transition ${
                              savedItems.includes(item.id) 
                                ? 'text-rose-500 bg-rose-50' 
                                : 'text-gray-300 hover:text-rose-500 hover:bg-rose-50'
                            }`}
                          >
                            <Heart size={18} fill={savedItems.includes(item.id) ? 'currentColor' : 'none'} />
                          </button>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{item.description}</p>

                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin size={14} className="text-violet-500" />
                            {item.location}
                          </span>
                          <span className="flex items-center gap-1 bg-violet-50 text-violet-600 px-2 py-0.5 rounded-full text-xs font-medium">
                            {item.distance} km
                          </span>
                          <span className="flex items-center gap-1">
                            <Star size={13} className="text-amber-400 fill-amber-400" />
                            {item.rating} ({item.reviews})
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {item.tags.slice(0, 4).map((tag, i) => (
                            <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Users size={12} />
                            {item.students} students
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase size={12} />
                            {item.experience}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {item.availability}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-4 sm:mt-0 sm:ml-4 sm:flex-col justify-center">
                        <button className="px-4 py-2 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-700 transition shadow-sm hover:shadow-md w-full sm:w-auto">
                          Message
                        </button>
                        <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition w-full sm:w-auto flex items-center justify-center">
                          <Bookmark size={16} className="text-gray-500" />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between mt-8 pt-4 border-t border-gray-200 gap-4">
                <p className="text-sm text-gray-500">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredListings.length)} of {filteredListings.length} results
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3.5 py-1.5 rounded-lg text-sm transition-colors ${
                        currentPage === i + 1
                          ? 'bg-violet-600 text-white'
                          : 'border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Browse