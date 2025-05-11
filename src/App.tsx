import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { RecipeProvider } from './contexts/RecipeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import MyRecipes from './pages/MyRecipes';
import RecipeDetail from './pages/RecipeDetail';
import CreateRecipe from './pages/CreateRecipe';
import EditRecipe from './pages/EditRecipe';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <RecipeProvider>
          <NotificationProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="explore" element={<Explore />} />
                <Route path="recipes/:id" element={<RecipeDetail />} />
                <Route 
                  path="my-recipes/*" 
                  element={
                    <PrivateRoute>
                      <MyRecipes />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="create" 
                  element={
                    <PrivateRoute>
                      <CreateRecipe />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="edit/:id" 
                  element={
                    <PrivateRoute>
                      <EditRecipe />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="profile" 
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  } 
                />
              </Route>
            </Routes>
          </NotificationProvider>
        </RecipeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;