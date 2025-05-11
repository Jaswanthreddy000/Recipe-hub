import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, User, Users, Edit, Trash2, Share, ChefHat, Plus, Minus } from 'lucide-react';
import { useRecipes } from '../contexts/RecipeContext';
import { useAuth } from '../contexts/AuthContext';
import RecipeTimer from '../components/recipe/RecipeTimer';
import CollaboratorModal from '../components/recipe/CollaboratorModal';
import toast from 'react-hot-toast';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getRecipe, scaleIngredients, deleteRecipe } = useRecipes();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const recipe = getRecipe(id || '');
  const [servings, setServings] = useState(recipe?.servings || 1);
  const [showCollaboratorModal, setShowCollaboratorModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <ChefHat className="h-16 w-16 text-amber-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Recipe Not Found</h2>
        <p className="text-gray-600 mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
        <Link to="/explore" className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md transition-colors duration-200">
          Browse Recipes
        </Link>
      </div>
    );
  }
  
  const isAuthor = user && recipe.authorId === user.id;
  const isCollaborator = user && recipe.collaborators?.some(c => c.id === user.id);
  const canEdit = isAuthor || isCollaborator;
  
  const scaledIngredients = scaleIngredients(recipe.ingredients, servings / recipe.servings);
  
  const handleDeleteRecipe = async () => {
    if (!confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
      return;
    }
    
    setIsDeleting(true);
    try {
      await deleteRecipe(recipe.id);
      toast.success('Recipe deleted successfully');
      navigate('/my-recipes');
    } catch (error) {
      toast.error('Failed to delete recipe');
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };
  
  const increaseServings = () => {
    setServings(prev => prev + 1);
  };
  
  const decreaseServings = () => {
    if (servings > 1) {
      setServings(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="relative rounded-xl overflow-hidden mb-8">
        <div 
          className="h-64 sm:h-80 bg-cover bg-center"
          style={{ 
            backgroundImage: recipe.image 
              ? `url(${recipe.image})` 
              : "url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 p-6 text-white">
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {recipe.tags.map(tag => (
                <span 
                  key={tag}
                  className="bg-amber-600/80 text-white text-xs px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{recipe.title}</h1>
          
          <div className="flex items-center text-white/90 text-sm">
            <div className="flex items-center mr-4">
              <Clock className="h-4 w-4 mr-1" />
              <span>{recipe.cookingTime} min</span>
            </div>
            
            {recipe.author && (
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full overflow-hidden bg-amber-200 flex items-center justify-center mr-2">
                  {recipe.author.profileImage ? (
                    <img 
                      src={recipe.author.profileImage} 
                      alt={recipe.author.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4 text-amber-700" />
                  )}
                </div>
                <span>by {recipe.author.name}</span>
              </div>
            )}
          </div>
        </div>
        
        {canEdit && (
          <div className="absolute top-4 right-4 flex space-x-2">
            <Link 
              to={`/edit/${recipe.id}`}
              className="bg-white text-amber-700 p-2 rounded-full shadow-md hover:bg-amber-100 transition-colors duration-200"
            >
              <Edit className="h-5 w-5" />
            </Link>
            {isAuthor && (
              <>
                <button
                  onClick={() => setShowCollaboratorModal(true)}
                  className="bg-white text-amber-700 p-2 rounded-full shadow-md hover:bg-amber-100 transition-colors duration-200"
                >
                  <Users className="h-5 w-5" />
                </button>
                <button
                  onClick={handleDeleteRecipe}
                  disabled={isDeleting}
                  className="bg-white text-red-500 p-2 rounded-full shadow-md hover:bg-red-50 transition-colors duration-200"
                >
                  {isDeleting ? (
                    <div className="h-5 w-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Trash2 className="h-5 w-5" />
                  )}
                </button>
              </>
            )}
          </div>
        )}
      </div>
      
      {/* Description */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-amber-800">Description</h2>
        <p className="text-gray-700">{recipe.description}</p>
      </div>
      
      {/* Collaborators */}
      {recipe.collaborators && recipe.collaborators.length > 0 && (
        <div className="mb-8 bg-amber-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3 flex items-center text-amber-800">
            <Users className="h-5 w-5 mr-2" />
            Collaborators
          </h2>
          <div className="flex flex-wrap gap-2">
            {recipe.collaborators.map(collab => (
              <div 
                key={collab.id}
                className="flex items-center bg-white px-3 py-2 rounded-full shadow-sm"
              >
                <div className="w-6 h-6 rounded-full overflow-hidden bg-amber-200 flex items-center justify-center mr-2">
                  {collab.profileImage ? (
                    <img 
                      src={collab.profileImage} 
                      alt={collab.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4 text-amber-700" />
                  )}
                </div>
                <span className="text-sm text-gray-700">{collab.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Ingredients */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-amber-800">Ingredients</h2>
          <div className="flex items-center space-x-3 bg-white border border-amber-200 p-1 rounded-full">
            <button 
              onClick={decreaseServings}
              disabled={servings <= 1}
              className={`p-1 rounded-full ${
                servings <= 1 ? 'text-gray-400' : 'text-amber-600 hover:bg-amber-50'
              }`}
            >
              <Minus className="h-5 w-5" />
            </button>
            <span className="font-medium text-amber-800">{servings} {servings === 1 ? 'serving' : 'servings'}</span>
            <button 
              onClick={increaseServings}
              className="p-1 rounded-full text-amber-600 hover:bg-amber-50"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <ul className="space-y-3">
            {scaledIngredients.map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <div className="w-24 sm:w-32 flex-shrink-0 font-medium text-amber-800">
                  {ingredient.quantity && (
                    <span>{ingredient.quantity.toFixed(ingredient.quantity % 1 === 0 ? 0 : 2)}</span>
                  )}
                  {ingredient.unit && (
                    <span> {ingredient.unit}</span>
                  )}
                </div>
                <div>
                  <span className="text-gray-700">{ingredient.name}</span>
                  {ingredient.altQuantity && ingredient.altUnit && (
                    <span className="text-gray-500 text-sm ml-2">
                      ({ingredient.altQuantity.toFixed(ingredient.altQuantity % 1 === 0 ? 0 : 2)} {ingredient.altUnit})
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-amber-800">Instructions</h2>
        
        <div className="space-y-4">
          {recipe.steps.map((step, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-sm p-4"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-grow">
                  <p className="text-gray-700">{step.instruction}</p>
                  
                  {step.timerMinutes > 0 && (
                    <div className="mt-3">
                      <RecipeTimer 
                        minutes={step.timerMinutes} 
                        seconds={step.timerSeconds || 0}
                        stepIndex={index}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Share */}
      <div className="flex justify-center mt-12 mb-8">
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Recipe link copied to clipboard!');
          }}
          className="flex items-center space-x-2 bg-amber-100 hover:bg-amber-200 text-amber-800 px-4 py-2 rounded-full transition-colors duration-200"
        >
          <Share className="h-5 w-5" />
          <span>Share this recipe</span>
        </button>
      </div>
      
      {/* Collaborator Modal */}
      <CollaboratorModal 
        isOpen={showCollaboratorModal}
        onClose={() => setShowCollaboratorModal(false)}
        recipeId={recipe.id}
      />
    </div>
  );
};

export default RecipeDetail;