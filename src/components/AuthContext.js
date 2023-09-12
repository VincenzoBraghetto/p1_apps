import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export default function AuthProvider({ children }) {

  const [authToken, setAuthToken] = useState('');
  const [userId, setUserId] = useState('');
  const [tripId, setTripId] = useState('');
  const [destinationId, setDestinationId] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');

  // function setUser({
  //   id, token
  // }) {
  //   setAuthToken(token);
  //   setUserId(id);
  // };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, userId, setUserId, FirstName, setFirstName,
    LastName, setLastName, setTripId, tripId, destinationId, setDestinationId}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}