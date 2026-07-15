import React from 'react'
import { 
  Search, List, Bookmark, User, Settings, Plus,
  Home, MessageCircle, Heart, LogOut
} from 'lucide-react'

const Sidebar = ({ 
  savedItems = [], 
  onNavigate, 
  activeTab = 'browse',
  onLogout,
  className = ''
}) => {
  const menuItems = [
    { id: 'browse', label: 'Browse Listings', icon: Search },
    { id: 'my-listings', label: 'My Listings', icon: List },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className={`w-64 flex-shrink-0 bg-white border-r border-gray-200 h-[calc(100vh-80px)] sticky top-20 overflow-y-auto ${className}`}>
      <div className="p-4 space-y-2">
        {/* Navigation Items */}
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          const isBookmarks = item.id === 'bookmarks'
          const bookmarkCount = savedItems.length

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-violet-50 text-violet-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-violet-600' : 'text-gray-400 group-hover:text-gray-600'} />
              <span className="text-sm flex-1 text-left">{item.label}</span>
              {isBookmarks && bookmarkCount > 0 && (
                <span className="bg-violet-100 text-violet-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                  {bookmarkCount}
                </span>
              )}
              {isActive && (
                <div className="w-1.5 h-8 bg-violet-600 rounded-full"></div>
              )}
            </button>
          )
        })}

        {/* Divider */}
        <div className="my-4 border-t border-gray-200"></div>

        {/* Create Listing Button */}
        <button
          onClick={() => onNavigate('create')}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition shadow-sm hover:shadow-md font-medium text-sm"
        >
          <Plus size={18} />
          Create Listing
        </button>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200 mt-2"
        >
          <LogOut size={20} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar