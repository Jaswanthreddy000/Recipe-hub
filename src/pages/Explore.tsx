import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { useRecipes } from '../contexts/RecipeContext';
import RecipeCard from '../components/recipe/RecipeCard';
import { Recipe } from '../services/mockService';

const Explore: React.FC = () => {
  const { recipes, loading } = useRecipes();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  
  // Extract all unique tags from recipes
  const allTags = Array.from(
    new Set(
      recipes
        .filter(recipe => recipe.isPublic)
        .flatMap(recipe => recipe.tags || [])
    )
  ).sort();
  
  // Filter recipes based on search term and tag
  useEffect(() => {
    const filtered = recipes
      .filter(recipe => recipe.isPublic)
      .filter(recipe => {
        const matchesSearch = searchTerm
          ? recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
          : true;
          
        const matchesTag = selectedTag
          ? recipe.tags?.includes(selectedTag)
          : true;
          
        return matchesSearch && matchesTag;
      });
      
    setFilteredRecipes(filtered);
  }, [searchTerm, selectedTag, recipes]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-amber-800">Explore Recipes</h1>
        <p className="text-gray-600">Discover and try recipes from our community</p>
      </div>
      
      {/* Search and Filter */}
      <div className="mb-8">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
        
        {allTags.length > 0 && (
          <div>
            <div className="flex items-center mb-2">
              <Filter className="h-4 w-4 text-amber-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Filter by tag:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedTag === tag
                      ? 'bg-amber-500 text-white'
                      : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                  } transition-colors duration-200`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Results */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
        </div>
      ) : filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <Search className="h-16 w-16 text-amber-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">No recipes found</h3>
          <p className="text-gray-600">
            {searchTerm || selectedTag ? (
              <>Try adjusting your search or filters to find more recipes.</>
            ) : (
              <>There are no public recipes available yet.</>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default Explore;