// This file contains mock data and service functions to simulate a backend

import { v4 as uuidv4 } from 'uuid';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  bio?: string;
}

export interface Ingredient {
  name: string;
  quantity: number | null;
  unit: string | null;
  altQuantity: number | null;
  altUnit: string | null;
}

export interface Step {
  instruction: string;
  timerMinutes: number;
  timerSeconds: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image?: string;
  authorId: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  cookingTime: number;
  servings: number;
  isPublic: boolean;
  tags?: string[];
  ingredients: Ingredient[];
  steps: Step[];
  collaborators?: User[];
}

export interface Invite {
  id: string;
  recipeId: string;
  recipeName: string;
  inviterId: string;
  inviterName: string;
  inviteeId: string;
  createdAt: string;
}

// Mock Data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    profileImage: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg',
    bio: 'Food enthusiast and home cook.'
  },
  {
    id: '2',
    name: 'Chef Alex',
    email: 'alex@example.com',
    profileImage: 'https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg',
    bio: 'Professional chef with 10+ years of experience.'
  },
  {
    id: '3',
    name: 'Baker Maria',
    email: 'maria@example.com',
    profileImage: 'https://images.pexels.com/photos/925786/pexels-photo-925786.jpeg',
    bio: 'Pastry chef and baking instructor.'
  }
];

const mockRecipesList: Recipe[] = [
  {
    id: '1',
    title: 'Classic Chocolate Chip Cookies',
    description: 'The perfect chocolate chip cookies that are crispy on the outside, chewy on the inside.',
    image: 'https://images.pexels.com/photos/3028208/pexels-photo-3028208.jpeg',
    authorId: '1',
    author: mockUsers[0],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    cookingTime: 30,
    servings: 24,
    isPublic: true,
    tags: ['Dessert', 'Cookies', 'Baking'],
    ingredients: [
      { name: 'All-purpose flour', quantity: 2.25, unit: 'cups', altQuantity: 281.25, altUnit: 'g' },
      { name: 'Baking soda', quantity: 1, unit: 'tsp', altQuantity: null, altUnit: null },
      { name: 'Salt', quantity: 1, unit: 'tsp', altQuantity: null, altUnit: null },
      { name: 'Unsalted butter, softened', quantity: 1, unit: 'cup', altQuantity: 227, altUnit: 'g' },
      { name: 'Brown sugar', quantity: 0.75, unit: 'cup', altQuantity: 150, altUnit: 'g' },
      { name: 'Granulated sugar', quantity: 0.75, unit: 'cup', altQuantity: 150, altUnit: 'g' },
      { name: 'Vanilla extract', quantity: 1, unit: 'tsp', altQuantity: null, altUnit: null },
      { name: 'Large eggs', quantity: 2, unit: 'whole', altQuantity: null, altUnit: null },
      { name: 'Semi-sweet chocolate chips', quantity: 2, unit: 'cups', altQuantity: 350, altUnit: 'g' }
    ],
    steps: [
      { 
        instruction: 'Preheat oven to 375°F (190°C). Line baking sheets with parchment paper.', 
        timerMinutes: 0, 
        timerSeconds: 0 
      },
      { 
        instruction: 'In a small bowl, whisk together the flour, baking soda, and salt.', 
        timerMinutes: 0, 
        timerSeconds: 0 
      },
      { 
        instruction: 'In a large bowl, beat the butter, brown sugar, and granulated sugar until creamy.', 
        timerMinutes: 2, 
        timerSeconds: 0 
      },
      { 
        instruction: 'Add vanilla and eggs to the butter mixture, one at a time, beating well after each addition.', 
        timerMinutes: 1, 
        timerSeconds: 0 
      },
      { 
        instruction: 'Gradually add the flour mixture to the butter mixture and mix until just combined.', 
        timerMinutes: 0, 
        timerSeconds: 0 
      },
      { 
        instruction: 'Stir in chocolate chips.', 
        timerMinutes: 0, 
        timerSeconds: 0 
      },
      { 
        instruction: 'Drop rounded tablespoons of dough onto the prepared baking sheets.', 
        timerMinutes: 0, 
        timerSeconds: 0 
      },
      { 
        instruction: 'Bake until edges are golden brown but centers are still soft.', 
        timerMinutes: 9, 
        timerSeconds: 0 
      },
      { 
        instruction: 'Cool on baking sheets for 2 minutes, then transfer to wire racks to cool completely.', 
        timerMinutes: 2, 
        timerSeconds: 0 
      }
    ],
    collaborators: [mockUsers[2]]
  },
  {
    id: '2',
    title: 'Perfect Homemade Pizza',
    description: 'Make restaurant-quality pizza in your own kitchen with this foolproof recipe.',
    image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg',
    authorId: '2',
    author: mockUsers[1],
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    cookingTime: 45,
    servings: 4,
    isPublic: true,
    tags: ['Main Course', 'Italian', 'Dinner'],
    ingredients: [
      { name: 'All-purpose flour', quantity: 3.5, unit: 'cups', altQuantity: 438, altUnit: 'g' },
      { name: 'Active dry yeast', quantity: 2.25, unit: 'tsp', altQuantity: 7, altUnit: 'g' },
      { name: 'Sugar', quantity: 1, unit: 'tsp', altQuantity: null, altUnit: null },
      { name: 'Salt', quantity: 1.5, unit: 'tsp', altQuantity: null, altUnit: null },
      { name: 'Warm water', quantity: 1.5, unit: 'cups', altQuantity: 355, altUnit: 'ml' },
      { name: 'Olive oil', quantity: 2, unit: 'tbsp', altQuantity: 30, altUnit: 'ml' },
      { name: 'Tomato sauce', quantity: 1, unit: 'cup', altQuantity: 240, altUnit: 'ml' },
      { name: 'Mozzarella cheese, shredded', quantity: 2, unit: 'cups', altQuantity: 224, altUnit: 'g' },
      { name: 'Toppings of choice', quantity: null, unit: null, altQuantity: null, altUnit: null }
    ],
    steps: [
      { 
        instruction: 'In a large bowl, dissolve yeast and sugar in warm water. Let stand until foamy, about 5-10 minutes.', 
        timerMinutes: 10, 
        timerSeconds: 0 
      },
      { 
        instruction: 'Add flour, salt, and olive oil to the yeast mixture. Mix until a soft dough forms.', 
        timerMinutes: 0, 
        timerSeconds: 0 
      },
      { 
        instruction: 'Knead the dough on a floured surface until smooth and elastic.', 
        timerMinutes: 5, 
        timerSeconds: 0 
      },
      { 
        instruction: 'Place the dough in a greased bowl, cover, and let rise in a warm place until doubled in size.', 
        timerMinutes: 30, 
        timerSeconds: 0 
      },
      { 
        instruction: 'Preheat oven to 475°F (245°C).', 
        timerMinutes: 0, 
        timerSeconds: 0 
      },
      { 
        instruction: 'Punch down the dough and divide it into two portions. Roll each into a circle on a floured surface.', 
        timerMinutes: 0, 
        timerSeconds: 0 
      },
      { 
        instruction: 'Transfer the dough to greased pizza pans or baking sheets.', 
        timerMinutes: 0, 
        timerSeconds: 0 
      },
      { 
        instruction: 'Spread tomato sauce over the dough, leaving a small border around the edges.', 
        timerMinutes: 0, 
        timerSeconds: 0 
      },
      { 
        instruction: 'Sprinkle with cheese and add desired toppings.', 
        timerMinutes: 0, 
        timerSeconds: 0 
      },
      { 
        instruction: 'Bake until the crust is golden and the cheese is bubbly.', 
        timerMinutes: 12, 
        timerSeconds: 0 
      }
    ],
    collaborators: [mockUsers[0]]
  },
  {
    id: '3',
    title: 'Fresh Pasta Dough',
    description: 'Learn to make silky, tender homemade pasta from scratch with just a few ingredients.',
    image: 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg',
    authorId: '3',
    author: mockUsers[2],
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    cookingTime: 60,
    servings: 4,
    isPublic: true,
    tags: ['Italian', 'Pasta', 'From Scratch'],
    ingredients: [
      { name: '00 flour or all-purpose flour', quantity: 2, unit: 'cups', altQuantity: 250, altUnit: 'g' },
      { name: 'Large eggs', quantity: 3, unit: 'whole', altQuantity: null, altUnit: null },
      { name: 'Salt', quantity: 0.5, unit: 'tsp', altQuantity: null, altUnit: null },
      { name: 'Olive oil', quantity: 1, unit: 'tsp', altQuantity: 5, altUnit: 'ml' },
      { name: 'Water', quantity: 1, unit: 'tbsp', altQuantity: 15, altUnit: 'ml' }
    ],
    steps: [
      { 
        instruction: 'Mound the flour on a clean work surface and make a well in the center.', 
        timerMinutes: 0, 
        timerSeconds: 0 
      },
      { 
        instruction: 'Crack the eggs into the well and add salt and olive oil.', 
        timerMinutes: 0, 
        timerSeconds: 0 
      },
      { 
        instruction: 'Using a fork, gradually mix the flour into the eggs from the inner rim of the well.', 
        timerMinutes: 0, 
        timerSeconds: 0 
      },
      { 
        instruction: 'When the dough becomes too thick to mix with a fork, use your hands to incorporate the remaining flour.', 
        timerMinutes: 0, 
        timerSeconds: 0 
      },
      { 
        instruction: 'If the dough is too dry, add water, one teaspoon at a time. If it\'s too sticky, add more flour.', 
        timerMinutes: 0, 
        timerSeconds: 0 
      },
      { 
        instruction: 'Knead the dough on a floured surface until smooth and elastic.', 
        timerMinutes: 8, 
        timerSeconds: 0 
      },
      { 
        instruction: 'Shape the dough into a ball, wrap in plastic wrap, and let rest at room temperature.', 
        timerMinutes: 30, 
        timerSeconds: 0 
      },
      { 
        instruction: 'After resting, divide the dough into 4 pieces. Work with one piece at a time, keeping the others covered.', 
        timerMinutes: 0, 
        timerSeconds: 0 
      },
      { 
        instruction: 'Flatten the dough piece with your hands and roll it through a pasta machine, starting with the widest setting.', 
        timerMinutes: 0, 
        timerSeconds: 0 
      },
      { 
        instruction: 'Fold the dough in thirds and run it through the machine again. Repeat this process 3-4 times.', 
        timerMinutes: 0, 
        timerSeconds: 0 
      },
      { 
        instruction: 'Gradually reduce the settings on the pasta machine, rolling the dough through each setting once until you reach the desired thickness.', 
        timerMinutes: 0, 
        timerSeconds: 0 
      },
      { 
        instruction: 'Cut the pasta into your desired shape and cook in boiling salted water until al dente.', 
        timerMinutes: 2, 
        timerSeconds: 0 
      }
    ],
    collaborators: []
  }
];

let recipes = [...mockRecipesList];
let users = [...mockUsers];
let invites: Invite[] = [
  {
    id: '1',
    recipeId: '3',
    recipeName: 'Fresh Pasta Dough',
    inviterId: '3',
    inviterName: 'Baker Maria',
    inviteeId: '1',
    createdAt: new Date().toISOString()
  }
];

// Auth Services
export const mockAuth = {
  login: async (email: string, password: string): Promise<User> => {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = users.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    return user;
  },
  
  register: async (name: string, email: string, password: string): Promise<User> => {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (users.some(u => u.email === email)) {
      throw new Error('Email already in use');
    }
    
    const newUser: User = {
      id: uuidv4(),
      name,
      email,
      profileImage: undefined,
      bio: ''
    };
    
    users.push(newUser);
    return newUser;
  },
  
  updateProfile: async (userId: string, userData: Partial<User>): Promise<User> => {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) {
      throw new Error('User not found');
    }
    
    users[index] = { ...users[index], ...userData };
    
    // Also update user references in recipes
    recipes = recipes.map(recipe => {
      if (recipe.authorId === userId) {
        return { ...recipe, author: { ...users[index] } };
      }
      
      if (recipe.collaborators?.some(c => c.id === userId)) {
        return {
          ...recipe,
          collaborators: recipe.collaborators.map(c => 
            c.id === userId ? { ...users[index] } : c
          )
        };
      }
      
      return recipe;
    });
    
    return users[index];
  }
};

// Recipe Services
export const mockRecipes = {
  getAllRecipes: async (): Promise<Recipe[]> => {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return recipes;
  },
  
  getRecipeById: async (id: string): Promise<Recipe> => {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) {
      throw new Error('Recipe not found');
    }
    
    return recipe;
  },
  
  createRecipe: async (recipeData: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>): Promise<Recipe> => {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newRecipe: Recipe = {
      ...recipeData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      collaborators: []
    };
    
    recipes.push(newRecipe);
    return newRecipe;
  },
  
  updateRecipe: async (id: string, recipeData: Partial<Recipe>): Promise<Recipe> => {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const index = recipes.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Recipe not found');
    }
    
    recipes[index] = { 
      ...recipes[index], 
      ...recipeData, 
      updatedAt: new Date().toISOString() 
    };
    
    return recipes[index];
  },
  
  deleteRecipe: async (id: string): Promise<void> => {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = recipes.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Recipe not found');
    }
    
    recipes.splice(index, 1);
    
    // Also remove any invites for this recipe
    invites = invites.filter(invite => invite.recipeId !== id);
  },
  
  inviteCollaborator: async (recipeId: string, email: string, inviterId: string): Promise<void> => {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) {
      throw new Error('Recipe not found');
    }
    
    const inviter = users.find(u => u.id === inviterId);
    if (!inviter) {
      throw new Error('Inviter not found');
    }
    
    const invitee = users.find(u => u.email === email);
    if (!invitee) {
      throw new Error('User not found with this email');
    }
    
    // Check if user is already a collaborator
    if (recipe.collaborators?.some(c => c.id === invitee.id)) {
      throw new Error('User is already a collaborator on this recipe');
    }
    
    // Check if invite already exists
    if (invites.some(i => i.recipeId === recipeId && i.inviteeId === invitee.id)) {
      throw new Error('Invitation already sent to this user');
    }
    
    const newInvite: Invite = {
      id: uuidv4(),
      recipeId,
      recipeName: recipe.title,
      inviterId,
      inviterName: inviter.name,
      inviteeId: invitee.id,
      createdAt: new Date().toISOString()
    };
    
    invites.push(newInvite);
  }
};

// Invitation Services
export const mockInvites = {
  getInvitesByUserId: async (userId: string): Promise<Invite[]> => {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return invites.filter(invite => invite.inviteeId === userId);
  },
  
  acceptInvite: async (inviteId: string): Promise<void> => {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const index = invites.findIndex(i => i.id === inviteId);
    if (index === -1) {
      throw new Error('Invitation not found');
    }
    
    const invite = invites[index];
    
    // Find the recipe
    const recipeIndex = recipes.findIndex(r => r.id === invite.recipeId);
    if (recipeIndex === -1) {
      throw new Error('Recipe not found');
    }
    
    // Find the user
    const user = users.find(u => u.id === invite.inviteeId);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Add user as collaborator
    const collaborators = recipes[recipeIndex].collaborators || [];
    if (!collaborators.some(c => c.id === user.id)) {
      recipes[recipeIndex] = {
        ...recipes[recipeIndex],
        collaborators: [...collaborators, user]
      };
    }
    
    // Remove the invite
    invites.splice(index, 1);
  },
  
  declineInvite: async (inviteId: string): Promise<void> => {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = invites.findIndex(i => i.id === inviteId);
    if (index === -1) {
      throw new Error('Invitation not found');
    }
    
    // Remove the invite
    invites.splice(index, 1);
  }
};