import React, { useState } from 'react';
import { BookOpen, Menu, X, LogIn, UserPlus, LogOut, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, openAuthModal, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Vidalyva</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/courses" className="text-gray-700 hover:text-blue-600 transition-colors">
                Courses
              </Link>
              <a href="/#about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </a>
              <a href="/#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">
                Reviews
              </a>
              <a href="/#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
                Pricing
              </a>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center">
                    <LayoutDashboard className="w-5 h-5 mr-1" /> Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
                  >
                    <LogOut className="w-5 h-5 mr-1" /> Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => openAuthModal('signup')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/courses" className="block px-3 py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
              Courses
            </Link>
            <a href="/#about" className="block px-3 py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
              About
            </a>
            <a href="/#testimonials" className="block px-3 py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
              Reviews
            </a>
            <a href="/#pricing" className="block px-3 py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
              Pricing
            </a>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block px-3 py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
                <button
                  onClick={() => { logout(); setIsMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 bg-red-600 text-white rounded-lg mt-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => { openAuthModal('signup'); setIsMenuOpen(false); }}
                className="w-full text-left px-3 py-2 bg-blue-600 text-white rounded-lg mt-2"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;