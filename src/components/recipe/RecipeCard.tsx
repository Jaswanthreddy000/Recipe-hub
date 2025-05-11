import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, User } from 'lucide-react';
import { Recipe } from '../../services/mockService';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link to={`/recipes/${recipe.id}`}>
        <div className="h-48 overflow-hidden relative">
          {recipe.image ? (
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-amber-200 flex items-center justify-center">
              <span className="text-amber-800 font-medium">No Image</span>
            </div>
          )}
          {recipe.collaborators && recipe.collaborators.length > 0 && (
            <div className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
              <Users className="h-3 w-3 mr-1" />
              <span>Collaborative</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between">
          <Link to={`/recipes/${recipe.id}`}>
            <h3 className="font-bold text-lg text-amber-800 hover:text-amber-600 transition-colors">{recipe.title}</h3>
          </Link>
          {recipe.tags && recipe.tags.length > 0 && (
            <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full">
              {recipe.tags[0]}
            </span>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{recipe.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>{recipe.cookingTime} min</span>
          </div>
          
          <div className="flex items-center">
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
                <span className="text-xs text-gray-600">{recipe.author.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;