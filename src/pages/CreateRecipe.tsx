import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Plus, Trash2, FileImage, Clock, Tag, X } from 'lucide-react';
import { useRecipes } from '../contexts/RecipeContext';
import toast from 'react-hot-toast';

const CreateRecipe: React.FC = () => {
  const navigate = useNavigate();
  const { createRecipe } = useRecipes();
  const [activeTab, setActiveTab] = useState('info');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [recipeData, setRecipeData] = useState({
    title: '',
    description: '',
    image: '',
    cookingTime: 30,
    servings: 2,
    isPublic: true,
    tags: [] as string[],
    ingredients: [{ name: '', quantity: 1, unit: 'cup', altQuantity: null, altUnit: null }],
    steps: [{ instruction: '', timerMinutes: 0, timerSeconds: 0 }]
  });
  
  const [tagInput, setTagInput] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRecipeData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setRecipeData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecipeData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };
  
  const handleIngredientChange = (index: number, field: string, value: any) => {
    const updatedIngredients = [...recipeData.ingredients];
    updatedIngredients[index] = { ...updatedIngredients[index], [field]: value };
    setRecipeData(prev => ({ ...prev, ingredients: updatedIngredients }));
  };
  
  const handleStepChange = (index: number, field: string, value: any) => {
    const updatedSteps = [...recipeData.steps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setRecipeData(prev => ({ ...prev, steps: updatedSteps }));
  };
  
  const addIngredient = () => {
    setRecipeData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', quantity: 1, unit: 'cup', altQuantity: null, altUnit: null }]
    }));
  };
  
  const removeIngredient = (index: number) => {
    const updatedIngredients = [...recipeData.ingredients];
    updatedIngredients.splice(index, 1);
    setRecipeData(prev => ({ ...prev, ingredients: updatedIngredients }));
  };
  
  const addStep = () => {
    setRecipeData(prev => ({
      ...prev,
      steps: [...prev.steps, { instruction: '', timerMinutes: 0, timerSeconds: 0 }]
    }));
  };
  
  const removeStep = (index: number) => {
    const updatedSteps = [...recipeData.steps];
    updatedSteps.splice(index, 1);
    setRecipeData(prev => ({ ...prev, steps: updatedSteps }));
  };
  
  const addTag = () => {
    if (tagInput.trim() && !recipeData.tags.includes(tagInput.trim())) {
      setRecipeData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };
  
  const removeTag = (tag: string) => {
    setRecipeData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!recipeData.title.trim()) {
      toast.error('Please enter a recipe title');
      setActiveTab('info');
      return;
    }
    
    if (recipeData.ingredients.some(ing => !ing.name.trim())) {
      toast.error('Please fill in all ingredient names');
      setActiveTab('ingredients');
      return;
    }
    
    if (recipeData.steps.some(step => !step.instruction.trim())) {
      toast.error('Please fill in all step instructions');
      setActiveTab('steps');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const newRecipe = await createRecipe(recipeData);
      toast.success('Recipe created successfully!');
      navigate(`/recipes/${newRecipe.id}`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to create recipe');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Define tabs
  const tabs = [
    { id: 'info', label: 'Basic Info' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'steps', label: 'Steps' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-amber-800">Create New Recipe</h1>
        <p className="text-gray-600">Share your culinary masterpiece with the world</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-b-2 border-amber-500 text-amber-700'
                      : 'text-gray-500 hover:text-amber-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Basic Info Tab */}
        <div className={activeTab === 'info' ? 'block' : 'hidden'}>
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block mb-1 font-medium text-gray-700">
                Recipe Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={recipeData.title}
                onChange={handleInputChange}
                placeholder="e.g., Homemade Chocolate Chip Cookies"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block mb-1 font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={recipeData.description}
                onChange={handleInputChange}
                placeholder="Tell us about your recipe..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="image" className="block mb-1 font-medium text-gray-700">
                Image URL
              </label>
              <div className="flex">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FileImage className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={recipeData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Enter a URL for the recipe image
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="cookingTime" className="block mb-1 font-medium text-gray-700">
                  Cooking Time (minutes)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="cookingTime"
                    name="cookingTime"
                    min="1"
                    value={recipeData.cookingTime}
                    onChange={handleNumberChange}
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="servings" className="block mb-1 font-medium text-gray-700">
                  Servings
                </label>
                <input
                  type="number"
                  id="servings"
                  name="servings"
                  min="1"
                  value={recipeData.servings}
                  onChange={handleNumberChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Tags
              </label>
              <div className="flex">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Tag className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag and press Enter"
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={addTag}
                  className="ml-2 px-3 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
                >
                  Add
                </button>
              </div>
              
              {recipeData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {recipeData.tags.map(tag => (
                    <span 
                      key={tag}
                      className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-sm flex items-center"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 text-amber-500 hover:text-amber-700 focus:outline-none"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublic"
                name="isPublic"
                checked={recipeData.isPublic}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500"
              />
              <label htmlFor="isPublic" className="ml-2 block text-gray-700">
                Make this recipe public
              </label>
            </div>
          </div>
          
          <div className="mt-8 flex justify-between">
            <div></div>
            <button
              type="button"
              onClick={() => setActiveTab('ingredients')}
              className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
            >
              Next: Add Ingredients
            </button>
          </div>
        </div>
        
        {/* Ingredients Tab */}
        <div className={activeTab === 'ingredients' ? 'block' : 'hidden'}>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-amber-800">Ingredients</h2>
                <button
                  type="button"
                  onClick={addIngredient}
                  className="flex items-center space-x-1 text-amber-600 hover:text-amber-700"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Ingredient</span>
                </button>
              </div>
              
              {recipeData.ingredients.map((ingredient, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <label htmlFor={`ingredient-${index}`} className="block mb-1 text-sm font-medium text-gray-700">
                        Ingredient Name
                      </label>
                      <input
                        type="text"
                        id={`ingredient-${index}`}
                        value={ingredient.name}
                        onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                        placeholder="e.g., All-purpose flour"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="flex space-x-2">
                      <div className="w-24">
                        <label htmlFor={`quantity-${index}`} className="block mb-1 text-sm font-medium text-gray-700">
                          Quantity
                        </label>
                        <input
                          type="number"
                          id={`quantity-${index}`}
                          value={ingredient.quantity ?? ''}
                          onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value ? parseFloat(e.target.value) : null)}
                          placeholder="1"
                          min="0"
                          step="0.01"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div className="w-24">
                        <label htmlFor={`unit-${index}`} className="block mb-1 text-sm font-medium text-gray-700">
                          Unit
                        </label>
                        <select
                          id={`unit-${index}`}
                          value={ingredient.unit ?? ''}
                          onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        >
                          <option value="">None</option>
                          <option value="cup">cup</option>
                          <option value="tbsp">tbsp</option>
                          <option value="tsp">tsp</option>
                          <option value="oz">oz</option>
                          <option value="fl oz">fl oz</option>
                          <option value="g">g</option>
                          <option value="kg">kg</option>
                          <option value="ml">ml</option>
                          <option value="l">l</option>
                          <option value="pinch">pinch</option>
                          <option value="whole">whole</option>
                        </select>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="text-red-500 hover:text-red-700 self-end md:self-center"
                      disabled={recipeData.ingredients.length <= 1}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 mr-2">Alternative Measurement (Optional):</span>
                    </div>
                    <div className="flex space-x-2 mt-1">
                      <div className="w-24">
                        <input
                          type="number"
                          value={ingredient.altQuantity ?? ''}
                          onChange={(e) => handleIngredientChange(index, 'altQuantity', e.target.value ? parseFloat(e.target.value) : null)}
                          placeholder="Alt Qty"
                          min="0"
                          step="0.01"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div className="w-24">
                        <select
                          value={ingredient.altUnit ?? ''}
                          onChange={(e) => handleIngredientChange(index, 'altUnit', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        >
                          <option value="">None</option>
                          <option value="cup">cup</option>
                          <option value="tbsp">tbsp</option>
                          <option value="tsp">tsp</option>
                          <option value="oz">oz</option>
                          <option value="fl oz">fl oz</option>
                          <option value="g">g</option>
                          <option value="kg">kg</option>
                          <option value="ml">ml</option>
                          <option value="l">l</option>
                          <option value="pinch">pinch</option>
                          <option value="whole">whole</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => setActiveTab('info')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
            >
              Previous: Basic Info
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('steps')}
              className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
            >
              Next: Add Steps
            </button>
          </div>
        </div>
        
        {/* Steps Tab */}
        <div className={activeTab === 'steps' ? 'block' : 'hidden'}>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-amber-800">Steps</h2>
                <button
                  type="button"
                  onClick={addStep}
                  className="flex items-center space-x-1 text-amber-600 hover:text-amber-700"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Step</span>
                </button>
              </div>
              
              {recipeData.steps.map((step, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold">
                        {index + 1}
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <label htmlFor={`step-${index}`} className="block mb-1 text-sm font-medium text-gray-700">
                        Step Instructions
                      </label>
                      <textarea
                        id={`step-${index}`}
                        value={step.instruction}
                        onChange={(e) => handleStepChange(index, 'instruction', e.target.value)}
                        placeholder="Describe this step..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        required
                      />
                      
                      <div className="mt-3">
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Timer (Optional)
                        </label>
                        <div className="flex space-x-2">
                          <div>
                            <label htmlFor={`timer-min-${index}`} className="block mb-1 text-xs text-gray-500">
                              Minutes
                            </label>
                            <input
                              type="number"
                              id={`timer-min-${index}`}
                              value={step.timerMinutes}
                              onChange={(e) => handleStepChange(index, 'timerMinutes', parseInt(e.target.value) || 0)}
                              min="0"
                              className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor={`timer-sec-${index}`} className="block mb-1 text-xs text-gray-500">
                              Seconds
                            </label>
                            <input
                              type="number"
                              id={`timer-sec-${index}`}
                              value={step.timerSeconds}
                              onChange={(e) => handleStepChange(index, 'timerSeconds', parseInt(e.target.value) || 0)}
                              min="0"
                              max="59"
                              className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0 ml-2">
                      <button
                        type="button"
                        onClick={() => removeStep(index)}
                        className="text-red-500 hover:text-red-700"
                        disabled={recipeData.steps.length <= 1}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => setActiveTab('ingredients')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
            >
              Previous: Ingredients
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 disabled:opacity-70"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Creating...</span>
                </div>
              ) : (
                'Create Recipe'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;