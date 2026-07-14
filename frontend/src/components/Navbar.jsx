import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;
  const isAuthenticated = !!user;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/signin');
    setOpen(false);
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    setOpen(false);
    // If on home page, scroll to section
    if (window.location.pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to home page first, then scroll
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  };

  const navLinks = [
    { label: "Browse", to: "/browse" },
    { label: "How It Works", to: "#", action: () => scrollToSection('how-it-works') },
    { label: "About", to: "/about" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-md border-b border-gray-200"
          : "bg-white border-b border-gray-200"
      }`}
    >
      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center shadow-lg transition duration-300 group-hover:scale-105 bg-white">
              <img src={Logo} alt="LocalSkill Exchange Board Logo" className="w-full h-full object-cover" />
            </div>
            <div className="leading-none">
              <h1 className="text-2xl font-bold text-gray-900">LocalSkill</h1>
              <p className="text-sm text-gray-500">Exchange Board</p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={item.action || (() => navigate(item.to))}
                className="relative text-gray-700 font-semibold hover:text-violet-600 transition group pb-1 bg-transparent border-none cursor-pointer"
              >
                {item.label}
                <span className="absolute left-0 -bottom-1 w-0 h-[3px] rounded-full bg-violet-600 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-600 flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
                  <User size={16} className="text-violet-600" />
                  {user?.name || user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition border border-gray-200 hover:border-gray-300"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="px-5 py-2.5 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition border border-gray-200 hover:border-gray-300">
                  Log In
                </Link>
                <Link to="/signup" className="px-6 py-3 rounded-xl bg-violet-600 text-white font-semibold shadow-lg hover:bg-violet-700 transition shadow-violet-500/30">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition border border-gray-200"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white border-t border-gray-200 md:hidden overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-5">
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action || (() => { navigate(item.to); setOpen(false); })}
                  className="font-semibold text-gray-700 hover:text-violet-600 transition text-left bg-transparent border-none cursor-pointer"
                >
                  {item.label}
                </button>
              ))}

              <hr className="border-gray-200" />

              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 text-gray-600">
                    <User size={16} className="text-violet-600" />
                    <span>{user?.name || user?.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-3 font-semibold text-gray-700 hover:bg-gray-50 transition"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signin" onClick={() => setOpen(false)} className="border border-gray-200 rounded-lg py-3 text-center font-semibold text-gray-700 hover:bg-gray-50 transition">
                    Log In
                  </Link>
                  <Link to="/signup" onClick={() => setOpen(false)} className="bg-violet-600 text-white text-center rounded-lg py-3 font-semibold hover:bg-violet-700 transition shadow-lg shadow-violet-500/30">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;