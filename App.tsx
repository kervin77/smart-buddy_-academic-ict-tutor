import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { UnitLevel } from './pages/UnitLevel';

// Wrapper to protect routes requiring onboarding
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { settings } = useApp();
  if (!settings.hasOnboarded) {
    return <Navigate to="/settings" replace />;
  }
  return children;
};

const MainApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/settings" element={<Settings />} />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/unit/:id" 
        element={
          <ProtectedRoute>
            <UnitLevel />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <MainApp />
      </HashRouter>
    </AppProvider>
  );
}
