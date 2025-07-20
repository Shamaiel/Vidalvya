import React from 'react';
import AppRoutes from './routes/AppRoutes';
import AuthModal from './components/AuthModal';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthModalOpen, closeAuthModal, authMode } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <AppRoutes />
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} initialMode={authMode} />
    </div>
  );
}

export default App;