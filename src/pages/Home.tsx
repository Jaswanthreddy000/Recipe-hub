import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Users, Timer, Scale } from 'lucide-react';
import RecipeCard from '../components/recipe/RecipeCard';
import { useRecipes } from '../contexts/RecipeContext';

const Home: React.FC = () => {
  const { recipes, loading } = useRecipes();

  // Get featured recipes (most recently updated, max 6)
  const featuredRecipes = [...recipes]
    .filter(recipe => recipe.isPublic)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 6);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative bg-amber-700 text-white rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-800 to-amber-700/60 mix-blend-multiply"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg')" }}
        ></div>
        <div className="relative py-16 px-6 md:py-24 md:px-12 max-w-4xl mx-auto">
          <ChefHat className="h-12 w-12 mb-4 text-amber-300" />
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to RecipeHub</h1>
          <p className="text-lg md:text-xl mb-8 text-amber-100">
            The ultimate collaborative cooking platform where chefs come together
            to create, share, and perfect recipes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/explore" 
              className="bg-white text-amber-800 hover:bg-amber-100 px-6 py-3 rounded-lg font-medium text-center transition-colors duration-200"
            >
              Explore Recipes
            </Link>
            <Link 
              to="/register" 
              className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-lg font-medium text-center transition-colors duration-200"
            >
              Join the Community
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-8">
        <h2 className="text-2xl font-bold text-center mb-12 text-amber-800">Why Use RecipeHub?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-amber-600 p-6 rounded-xl shadow-md text-center">
          <div className="bg-white text-amber-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">Collaborate</h3>
          <p className="text-white">
            Work together in real-time with friends, family, or colleagues to perfect your recipes.
          </p>
        </div>

        <div className="bg-amber-600 p-6 rounded-xl shadow-md text-center">
          <div className="bg-white text-amber-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Scale className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">Scale Recipes</h3>
          <p className="text-white">
            Automatically adjust ingredient quantities for any number of servings.
          </p>
        </div>

        <div className="bg-amber-600 p-6 rounded-xl shadow-md text-center">
          <div className="bg-white text-amber-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Timer className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">Built-in Timers</h3>
          <p className="text-white">
            Add timers to each step for precise cooking instructions and timing.
          </p>
        </div>

          
          <div className="bg-amber-600 p-6 rounded-xl shadow-md text-center">
            <div className="bg-white text-amber-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChefHat className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Credit System</h3>
            <p className="text-white">
              Original creators are always credited, even as recipes evolve through collaboration.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Recipes */}
      <div className="py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-amber-800">Featured Recipes</h2>
          <Link to="/explore" className="text-amber-600 hover:text-amber-700 font-medium">
            View All →
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
          </div>
        ) : featuredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <ChefHat className="h-12 w-12 mx-auto text-amber-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">No recipes yet!</h3>
            <p className="text-gray-600 mb-4">Be the first to add some tasty recipes.</p>
            <Link 
              to="/create" 
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              Create Recipe
            </Link>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-500 rounded-xl p-8 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to collaborate on recipes?</h2>
        <p className="text-lg mb-8">Join thousands of food enthusiasts on RecipeHub today.</p>
        <Link 
          to="/register" 
          className="bg-white text-amber-700 hover:bg-amber-100 px-6 py-3 rounded-lg font-medium inline-block transition-colors duration-200"
        >
          Sign Up Now - It's Free!
        </Link>
      </div>
    </div>
  );
};

export default Home;