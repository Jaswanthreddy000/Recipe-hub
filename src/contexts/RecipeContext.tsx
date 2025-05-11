import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockRecipes, Recipe, Ingredient, Step, Invite } from '../services/mockService';
import { useAuth } from './AuthContext';

interface RecipeContextType {
  recipes: Recipe[];
  loading: boolean;
  getRecipe: (id: string) => Recipe | undefined;
  getUserRecipes: () => Recipe[];
  getCollaborationRecipes: () => Recipe[];
  createRecipe: (recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Recipe>;
  updateRecipe: (id: string, recipe: Partial<Recipe>) => Promise<Recipe>;
  deleteRecipe: (id: string) => Promise<void>;
  inviteCollaborator: (recipeId: string, email: string) => Promise<void>;
  scaleIngredients: (ingredients: Ingredient[], scale: number) => Ingredient[];
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};

interface RecipeProviderProps {
  children: ReactNode;
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const recipes = await mockRecipes.getAllRecipes();
        setRecipes(recipes);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const getRecipe = (id: string) => {
    return recipes.find(recipe => recipe.id === id);
  };

  const getUserRecipes = () => {
    if (!user) return [];
    return recipes.filter(recipe => recipe.authorId === user.id);
  };

  const getCollaborationRecipes = () => {
    if (!user) return [];
    return recipes.filter(
      recipe => recipe.collaborators?.some(collab => collab.id === user.id)
    );
  };

  const createRecipe = async (recipeData: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!user) throw new Error('User not authenticated');
    
    setLoading(true);
    try {
      const newRecipe = await mockRecipes.createRecipe({
        ...recipeData,
        authorId: user.id,
        author: {
          id: user.id,
          name: user.name,
          email: user.email,
          profileImage: user.profileImage
        }
      });
      
      setRecipes(prev => [...prev, newRecipe]);
      return newRecipe;
    } catch (error) {
      console.error('Failed to create recipe:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateRecipe = async (id: string, recipeData: Partial<Recipe>) => {
    if (!user) throw new Error('User not authenticated');
    
    setLoading(true);
    try {
      const existingRecipe = recipes.find(r => r.id === id);
      if (!existingRecipe) throw new Error('Recipe not found');
      
      // Check if user is author or collaborator
      const isAuthor = existingRecipe.authorId === user.id;
      const isCollaborator = existingRecipe.collaborators?.some(c => c.id === user.id) ?? false;
      
      if (!isAuthor && !isCollaborator) {
        throw new Error('Unauthorized to update this recipe');
      }
      
      const updatedRecipe = await mockRecipes.updateRecipe(id, recipeData);
      
      setRecipes(prev => 
        prev.map(recipe => recipe.id === id ? updatedRecipe : recipe)
      );
      
      return updatedRecipe;
    } catch (error) {
      console.error('Failed to update recipe:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteRecipe = async (id: string) => {
    if (!user) throw new Error('User not authenticated');
    
    setLoading(true);
    try {
      const existingRecipe = recipes.find(r => r.id === id);
      if (!existingRecipe) throw new Error('Recipe not found');
      
      // Only author can delete
      if (existingRecipe.authorId !== user.id) {
        throw new Error('Only the author can delete this recipe');
      }
      
      await mockRecipes.deleteRecipe(id);
      setRecipes(prev => prev.filter(recipe => recipe.id !== id));
    } catch (error) {
      console.error('Failed to delete recipe:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const inviteCollaborator = async (recipeId: string, email: string) => {
    if (!user) throw new Error('User not authenticated');
    
    setLoading(true);
    try {
      const existingRecipe = recipes.find(r => r.id === recipeId);
      if (!existingRecipe) throw new Error('Recipe not found');
      
      // Only author can invite
      if (existingRecipe.authorId !== user.id) {
        throw new Error('Only the author can invite collaborators');
      }
      
      await mockRecipes.inviteCollaborator(recipeId, email, user.id);
      
      // The mockInviteCollaborator service should have updated the recipe
      const updatedRecipes = await mockRecipes.getAllRecipes();
      setRecipes(updatedRecipes);
    } catch (error) {
      console.error('Failed to invite collaborator:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const scaleIngredients = (ingredients: Ingredient[], scale: number): Ingredient[] => {
    return ingredients.map(ingredient => {
      const scaledQuantity = ingredient.quantity ? ingredient.quantity * scale : null;
      const scaledAltQuantity = ingredient.altQuantity ? ingredient.altQuantity * scale : null;
      
      return {
        ...ingredient,
        quantity: scaledQuantity,
        altQuantity: scaledAltQuantity
      };
    });
  };

  const value = {
    recipes,
    loading,
    getRecipe,
    getUserRecipes,
    getCollaborationRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    inviteCollaborator,
    scaleIngredients
  };

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
};