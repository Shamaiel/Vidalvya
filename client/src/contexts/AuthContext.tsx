// import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// interface AuthContextType {
//   isAuthenticated: boolean;
//   user: { email: string } | null;
//   login: (email: string, token: string) => void;
//   logout: () => void;
//   isAuthModalOpen: boolean;
//   authMode: 'login' | 'signup';
//   openAuthModal: (mode: 'login' | 'signup') => void;
//   closeAuthModal: () => void;
// }

// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
 
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
//     return localStorage.getItem('authToken') ? true : false;
//   });

//   const [user, setUser] = useState<{ email: string } | null>(() => {
//     const storedUser = localStorage.getItem('user');
//     return storedUser ? JSON.parse(storedUser) : null;
//   });
//   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
//   const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

//   useEffect(() => {
//     if (isAuthenticated && user) {
//       localStorage.setItem('authToken', 'some-dummy-token'); // In a real app, this would be the actual token
//       localStorage.setItem('user', JSON.stringify(user));
//     } else {
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('user');
//     }
//   }, [isAuthenticated, user]);

//   const login = (email: string, token: string) => {
//     setIsAuthenticated(true);
//     setUser({ email });
//     // In a real app, you'd store the actual token here
//     localStorage.setItem('authToken', token); 
//     localStorage.setItem('user', JSON.stringify({ email }));
//     closeAuthModal();
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     setUser(null);
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('user');
//   };

//   const openAuthModal = (mode: 'login' | 'signup') => {
//     setAuthMode(mode);
//     setIsAuthModalOpen(true);
//   };

//   const closeAuthModal = () => {
//     setIsAuthModalOpen(false);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated,
//         user,
//         login,
//         logout,
//         isAuthModalOpen,
//         authMode,
//         openAuthModal,
//         closeAuthModal,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define the User interface based on your backend response
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  // Add any other user properties your backend returns
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, userData: User) => void; // Updated: expects full User object
  logout: () => void;
  isAuthModalOpen: boolean;
  authMode: 'login' | 'signup';
  openAuthModal: (mode: 'login' | 'signup') => void;
  closeAuthModal: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // This useEffect runs once on component mount to initialize state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token'); // Use 'token' as per AuthModal
    const storedUser = localStorage.getItem('user'); // Use 'user' as per AuthModal

    if (storedToken && storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setIsAuthenticated(true);
        setUser(parsedUser);
      } catch (e) {
        console.error("Failed to parse user data from localStorage or token invalid", e);
        // Clear corrupted data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
      }
    }
  }, []); // Empty dependency array means it runs only once on mount

  // Login function now accepts the full user data object
  const login = (token: string, userData: User) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('token', token); // Ensure 'token' matches 'localStorage.getItem' above
    localStorage.setItem('user', JSON.stringify(userData));
    // The closeAuthModal is handled by the AuthModal component itself,
    // or you can call it here if you want the context to manage it directly.
    // For now, let's let AuthModal handle its own closing.
    // closeAuthModal(); 
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        isAuthModalOpen,
        authMode,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};