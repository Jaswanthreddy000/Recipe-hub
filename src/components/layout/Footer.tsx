import React from 'react';
import { ChefHat, Github as GitHub, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-50 text-amber-800 py-10 border-t border-amber-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <ChefHat className="h-8 w-8 mr-2 text-amber-600" />
            <span className="text-xl font-bold text-amber-700">RecipeHub</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0 items-center text-sm">
            <Link to="/" className="hover:text-amber-900 transition-colors">Home</Link>
            <Link to="/explore" className="hover:text-amber-900 transition-colors">Explore</Link>
            <Link to="/my-recipes" className="hover:text-amber-900 transition-colors">My Recipes</Link>
          </div>
          
          <div className="mt-6 md:mt-0 flex items-center space-x-2 text-sm">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-400 fill-current" />
            <span>by</span>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1 hover:text-amber-900 transition-colors"
            >
              <GitHub className="h-4 w-4" />
              <span>RecipeHub Team</span>
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} RecipeHub. All rights reserved.</p>
          <p className="mt-1">The ultimate collaborative cooking platform.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
