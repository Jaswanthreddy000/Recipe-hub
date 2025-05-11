import React, { useState } from 'react';
import { Link, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { ChefHat, PlusCircle, BookOpen, Users, Bell } from 'lucide-react';
import { useRecipes } from '../contexts/RecipeContext';
import { useNotification } from '../contexts/NotificationContext';
import RecipeCard from '../components/recipe/RecipeCard';
import InviteCard from '../components/recipe/InviteCard';

const MyRecipesList: React.FC = () => {
  const { getUserRecipes, loading } = useRecipes();
  const navigate = useNavigate();
  
  const userRecipes = getUserRecipes();
  
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
      </div>
    );
  }
  
  if (userRecipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl shadow-sm">
        <ChefHat className="h-16 w-16 text-amber-400 mb-4" />
        <h3 className="text-xl font-medium mb-2">No recipes yet!</h3>
        <p className="text-gray-600 mb-6">You haven't created any recipes yet.</p>
        <button 
          onClick={() => navigate('/create')}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          Create Your First Recipe
        </button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {userRecipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

const CollaborationsList: React.FC = () => {
  const { getCollaborationRecipes, loading } = useRecipes();
  
  const collaborationRecipes = getCollaborationRecipes();
  
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
      </div>
    );
  }
  
  if (collaborationRecipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl shadow-sm">
        <Users className="h-16 w-16 text-amber-400 mb-4" />
        <h3 className="text-xl font-medium mb-2">No collaborations yet!</h3>
        <p className="text-gray-600 mb-6">You're not collaborating on any recipes yet.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {collaborationRecipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

const InvitesList: React.FC = () => {
  const { invites, loading, acceptInvite, declineInvite } = useNotification();
  
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
      </div>
    );
  }
  
  if (invites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl shadow-sm">
        <Bell className="h-16 w-16 text-amber-400 mb-4" />
        <h3 className="text-xl font-medium mb-2">No invites!</h3>
        <p className="text-gray-600">You don't have any pending invitations.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {invites.map(invite => (
        <InviteCard 
          key={invite.id} 
          invite={invite}
          onAccept={() => acceptInvite(invite.id)}
          onDecline={() => declineInvite(invite.id)}
        />
      ))}
    </div>
  );
};

const MyRecipes: React.FC = () => {
  const { invites } = useNotification();
  
  const tabs = [
    { path: '', label: 'My Recipes', icon: <BookOpen className="h-5 w-5" /> },
    { path: 'collaborations', label: 'Collaborations', icon: <Users className="h-5 w-5" /> },
    { 
      path: 'invites', 
      label: 'Invites', 
      icon: <Bell className="h-5 w-5" />,
      badge: invites.length || null
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-amber-800">My Recipes</h1>
        <Link 
          to="/create" 
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md flex items-center space-x-1 transition-colors duration-200"
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Recipe</span>
        </Link>
      </div>
      
      <div className="bg-amber-50 rounded-lg p-1 flex mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <NavLink
            key={tab.path}
            to={`/my-recipes/${tab.path}`}
            end={tab.path === ''}
            className={({ isActive }) => `
              flex-1 min-w-0 px-4 py-2 text-center rounded-md transition-all duration-200
              flex items-center justify-center space-x-2
              ${isActive ? 'bg-white text-amber-700 shadow-sm' : 'text-amber-600 hover:bg-white/50'}
            `}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="flex items-center justify-center bg-red-500 text-white text-xs rounded-full h-5 w-5">
                {tab.badge}
              </span>
            )}
          </NavLink>
        ))}
      </div>
      
      <Routes>
        <Route path="/" element={<MyRecipesList />} />
        <Route path="/collaborations" element={<CollaborationsList />} />
        <Route path="/invites" element={<InvitesList />} />
      </Routes>
    </div>
  );
};

export default MyRecipes;