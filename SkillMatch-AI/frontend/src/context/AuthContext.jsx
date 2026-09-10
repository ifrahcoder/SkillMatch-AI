import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Ifrah Bashir',
    email: 'ifrah@example.com',
    role: 'Full Stack Developer',
    skills: ['React.js', 'JavaScript', 'HTML/CSS', 'Python']
  });

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);