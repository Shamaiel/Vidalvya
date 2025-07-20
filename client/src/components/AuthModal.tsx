import React, { useState } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth'; // Adjust this path if your hook is in a different location

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Use the useAuth hook to get the login function and other state/actions
  const { login: authLogin, closeAuthModal: closeAuthContextModal } = useAuth(); // Renamed to avoid conflict

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (mode === 'signup' && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'signup' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';

      const payload = mode === 'login'
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };

      const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Use the login function from AuthContext
        authLogin(data.token, data.user); // Pass token and the entire user object
        onClose(); // Close the modal
        navigate('/dashboard'); // Navigate to dashboard
      } else {
        setErrors({ submit: data.message || 'Something went wrong' });
      }
    } catch (error) {
      console.error('Auth submission error:', error); // Log the actual error
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setErrors({});
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative animate-in fade-in duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center">
            <BookOpen className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">
              {mode === 'login' ? 'Welcome Back' : 'Join LearnPro'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          )}

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? 'Please wait...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        {/* Footer */}
        <div className="px-6 pb-6">
          <div className="text-center">
            <p className="text-gray-600">
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={switchMode}
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {mode === 'login' && (
            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                Forgot your password?
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;



// import React, { useState } from 'react';
// import { X, Eye, EyeOff, Mail, Lock, User, BookOpen } from 'lucide-react';
// import { useNavigate } from 'react-router';

// interface AuthModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   initialMode?: 'login' | 'signup';
// }

// const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
//   const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

  
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });


//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isLoading, setIsLoading] = useState(false);

//   if (!isOpen) return null;

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     if (mode === 'signup' && !formData.name.trim()) {
//       newErrors.name = 'Name is required';
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     if (mode === 'signup' && formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;

//     setIsLoading(true);
    
//     try {
//       const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
     
//       const payload = mode === 'login' 
//         ? { email: formData.email, password: formData.password }
//         : { name: formData.name, email: formData.email, password: formData.password };

//       const response = await fetch(`http://localhost:8000${endpoint}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('user', JSON.stringify(data.user));
//         onClose();
//         // You can add a success notification here
//         navigate('/dashboard');

//       } else {
//         setErrors({ submit: data.message || 'Something went wrong' });
//       }
//     } catch (error) {
//       setErrors({ submit: 'Network error. Please try again.' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const switchMode = () => {
//     setMode(mode === 'login' ? 'signup' : 'login');
//     setErrors({});
//     setFormData({ name: '', email: '', password: '', confirmPassword: '' });
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative animate-in fade-in duration-300">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-100">
//           <div className="flex items-center">
//             <BookOpen className="w-6 h-6 text-blue-600 mr-2" />
//             <h2 className="text-2xl font-bold text-gray-900">
//               {mode === 'login' ? 'Welcome Back' : 'Join LearnPro'}
//             </h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//           {mode === 'signup' && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Full Name
//               </label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
//                     errors.name ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="Enter your full name"
//                 />
//               </div>
//               {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//             </div>
//           )}

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Email Address
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
//                   errors.email ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter your email"
//               />
//             </div>
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
//                   errors.password ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter your password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>
//             </div>
//             {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//           </div>

//           {mode === 'signup' && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                   className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
//                     errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="Confirm your password"
//                 />
//               </div>
//               {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
//             </div>
//           )}

//           {errors.submit && (
//             <div className="bg-red-50 border border-red-200 rounded-lg p-3">
//               <p className="text-red-600 text-sm">{errors.submit}</p>
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//           >
//             {isLoading ? 'Please wait...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
//           </button>
//         </form>

//         {/* Footer */}
//         <div className="px-6 pb-6">
//           <div className="text-center">
//             <p className="text-gray-600">
//               {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
//               <button
//                 onClick={switchMode}
//                 className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
//               >
//                 {mode === 'login' ? 'Sign up' : 'Sign in'}
//               </button>
//             </p>
//           </div>

//           {mode === 'login' && (
//             <div className="mt-4 text-center">
//               <a href="#" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
//                 Forgot your password?
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthModal;




// import React, { useState } from 'react';
// import Modal from './common/Modal';
// import InputField from './common/InputField';
// import Button from './common/Button';
// import { X } from 'lucide-react';
// import { useAuth } from '../hooks/useAuth';

// interface AuthModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   initialMode: 'login' | 'signup';
// }

// const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode }) => {
//   const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const { login } = useAuth(); // Use the login function from AuthContext

//   React.useEffect(() => {
//     setMode(initialMode);
//   }, [initialMode]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (mode === 'signup' && password !== confirmPassword) {
//       alert("Passwords don't match!");
//       return;
//     }
//     console.log(`${mode} attempt with:`, { email, password });
//     // Simulate API call for login/signup
//     if (email && password) {
//       // For demonstration, always "login" successfully if fields are filled
//       login(email, 'dummy-jwt-token'); 
//     }
//     // In a real application, you would send this data to your backend
//     // and handle success/error responses.
//     onClose();
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <div className="bg-white p-8 rounded-lg shadow-xl relative w-full max-w-md mx-auto">
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
//           <X className="w-6 h-6" />
//         </button>
//         <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
//           {mode === 'login' ? 'Welcome Back!' : 'Join LearnPro Today!'}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <InputField
//             label="Email Address"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <InputField
//             label="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           {mode === 'signup' && (
//             <InputField
//               label="Confirm Password"
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           )}
//           <Button type="submit" variant="primary" className="w-full">
//             {mode === 'login' ? 'Log In' : 'Sign Up'}
//           </Button>
//         </form>
//         <p className="mt-6 text-center text-gray-600">
//           {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
//           <button
//             onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
//             className="text-blue-600 hover:underline ml-1 font-medium"
//           >
//             {mode === 'login' ? 'Sign Up' : 'Log In'}
//           </button>
//         </p>
//       </div>
//     </Modal>
//   );
// };

// export default AuthModal;