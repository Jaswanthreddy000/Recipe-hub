import React from 'react';
import { ChefHat, Github as GitHub, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-800 text-amber-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <ChefHat className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold">RecipeHub</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0 items-center">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/explore" className="hover:text-white transition-colors">Explore</Link>
            <Link to="/my-recipes" className="hover:text-white transition-colors">My Recipes</Link>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-400 fill-current" />
            <span>by</span>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1 hover:text-white transition-colors"
            >
              <GitHub className="h-4 w-4" />
              <span>RecipeHub Team</span>
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-amber-200 text-sm">
          <p>&copy; {new Date().getFullYear()} RecipeHub. All rights reserved.</p>
          <p className="mt-1">The ultimate collaborative cooking platform.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;