// import {useState, useEffect, createContext, useContext, ReactNode } from 'react';
// import { useMutation, useQuery } from 'convex/react';
// import { api } from '../../../convex/_generated/api';

// interface User {
//     id: string;
//     email: string;
//     name?: string;
// }

// interface AuthContextType {
//     user: User | null;
//     isAuthenticated: boolean;
//     isLoading: boolean;
//     login: (email: string, password: string) => Promise<void>;
//     register: (email: string, password: string, name?: string) => Promise<void>;
//     logout: () => Promise<void>;
//     error: string | null;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
  
//   // Convex mutations
//   const loginMutation = useMutation(api.auth.login);
//   const registerMutation = useMutation(api.auth.register);
//   const logoutMutation = useMutation(api.auth.logout);
  
//   // Get stored token
//   const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  
//   // Verify session if token exists
//   const sessionResult = useQuery(
//     api.auth.verifySession, 
//     token ? { token } : "skip"
//   );
  
//   // Update auth state when session result changes
//   useEffect(() => {
//     if (sessionResult !== undefined) {
//       setIsLoading(false);
      
//       if (sessionResult && sessionResult.authenticated) {
//         if (sessionResult.user) {
//           setUser(sessionResult.user);
//         }
//       } else {
//         // Clear invalid token
//         if (token) {
//           localStorage.removeItem('authToken');
//         }
//         setUser(null);
//       }
//     }
//   }, [sessionResult, token]);
  
//   // Login function
//   const login = async (email: string, password: string) => {
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       const result = await loginMutation({ email, password });
//       localStorage.setItem('authToken', result.token);
//       setUser(result.user);
//     } catch (err: any) {
//       setError(err.message || 'Login failed');
//       console.error('Login error:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   // Register function
//   const register = async (email: string, password: string, name?: string) => {
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       await registerMutation({ email, password, name: name || '' });
//       // Auto login after registration
//       await login(email, password);
//     } catch (err: any) {
//       setError(err.message || 'Registration failed');
//       console.error('Registration error:', err);
//       setIsLoading(false);
//     }
//   };
  
//   // Logout function
//   const logout = async () => {
//     setIsLoading(true);
    
//     try {
//       if (token) {
//         await logoutMutation({ token });
//         localStorage.removeItem('authToken');
//       }
//       setUser(null);
//     } catch (err) {
//       console.error('Logout error:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   return (
//     <AuthContext.Provider value={{
//       user,
//       isAuthenticated: !!user,
//       isLoading,
//       login,
//       register,
//       logout,
//       error
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };