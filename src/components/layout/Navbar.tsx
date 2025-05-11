import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ChefHat, Home, Search, BookOpen, User, Menu, X, PlusCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { invites } = useNotification();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    closeMenu();
  };

  const activeClass = "text-amber-700 font-medium border-b-2 border-amber-500";
  const inactiveClass = "text-gray-600 hover:text-amber-600 transition-colors duration-200";

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-amber-600" />
            <span className="text-xl font-bold text-amber-700">RecipeHub</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => isActive ? activeClass : inactiveClass}
            >
              <div className="flex items-center space-x-1">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </div>
            </NavLink>
            <NavLink 
              to="/explore" 
              className={({ isActive }) => isActive ? activeClass : inactiveClass}
            >
              <div className="flex items-center space-x-1">
                <Search className="h-4 w-4" />
                <span>Explore</span>
              </div>
            </NavLink>
            {user && (
              <NavLink 
                to="/my-recipes" 
                className={({ isActive }) => isActive ? activeClass : inactiveClass}
              >
                <div className="flex items-center space-x-1">
                  <BookOpen className="h-4 w-4" />
                  <span>My Recipes</span>
                  {invites.length > 0 && (
                    <span className="flex items-center justify-center ml-1 bg-red-500 text-white text-xs rounded-full h-5 w-5">
                      {invites.length}
                    </span>
                  )}
                </div>
              </NavLink>
            )}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
              
              <div className="relative group">
                <div className="flex items-center space-x-2 text-gray-700 hover:text-amber-600 cursor-pointer">
                  <User className="h-5 w-5" />
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 delay-100">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                  >
                    Logout
                  </button>
                </div>
              </div>

              </>
            ) : (
              <div className="space-x-3">
                <Link to="/login" className="text-amber-600 hover:text-amber-800">
                  Login
                </Link>
                <Link to="/register" className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md transition-colors duration-200">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-500 hover:text-amber-600 focus:outline-none">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="pt-2 pb-4 space-y-2">
            <NavLink 
              to="/" 
              end
              onClick={closeMenu}
              className={({ isActive }) => 
                `block px-4 py-2 rounded-md ${isActive ? 'bg-amber-50 text-amber-700' : 'text-gray-600 hover:bg-amber-50 hover:text-amber-600'}`
              }
            >
              <div className="flex items-center space-x-2">
                <Home className="h-5 w-5" />
                <span>Home</span>
              </div>
            </NavLink>
            <NavLink 
              to="/explore" 
              onClick={closeMenu}
              className={({ isActive }) => 
                `block px-4 py-2 rounded-md ${isActive ? 'bg-amber-50 text-amber-700' : 'text-gray-600 hover:bg-amber-50 hover:text-amber-600'}`
              }
            >
              <div className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Explore</span>
              </div>
            </NavLink>
            {user && (
              <>
                <NavLink 
                  to="/my-recipes" 
                  onClick={closeMenu}
                  className={({ isActive }) => 
                    `block px-4 py-2 rounded-md ${isActive ? 'bg-amber-50 text-amber-700' : 'text-gray-600 hover:bg-amber-50 hover:text-amber-600'}`
                  }
                >
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>My Recipes</span>
                    {invites.length > 0 && (
                      <span className="flex items-center justify-center ml-1 bg-red-500 text-white text-xs rounded-full h-5 w-5">
                        {invites.length}
                      </span>
                    )}
                  </div>
                </NavLink>
                {/* <NavLink 
                  to="/create" 
                  onClick={closeMenu}
                  className={({ isActive }) => 
                    `block px-4 py-2 rounded-md ${isActive ? 'bg-amber-50 text-amber-700' : 'text-gray-600 hover:bg-amber-50 hover:text-amber-600'}`
                  }
                >
                  <div className="flex items-center space-x-2">
                    <PlusCircle className="h-5 w-5" />
                    <span>New Recipe</span>
                  </div>
                </NavLink> */}
                <NavLink 
                  to="/profile" 
                  onClick={closeMenu}
                  className={({ isActive }) => 
                    `block px-4 py-2 rounded-md ${isActive ? 'bg-amber-50 text-amber-700' : 'text-gray-600 hover:bg-amber-50 hover:text-amber-600'}`
                  }
                >
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </div>
                </NavLink>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-amber-50 hover:text-amber-600 rounded-md"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            )}
            {!user && (
              <div className="px-4 py-2 space-y-2">
                <Link 
                  to="/login" 
                  onClick={closeMenu}
                  className="block w-full text-center py-2 text-amber-600 hover:text-amber-700"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  onClick={closeMenu}
                  className="block w-full text-center bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;