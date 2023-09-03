import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export default function AuthProvider({ children }) {

  const [authToken, setAuthToken] = useState('');
  const [userId, setUserId] = useState('');

  // function setUser({
  //   id, token
  // }) {
  //   setAuthToken(token);
  //   setUserId(id);
  // };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}