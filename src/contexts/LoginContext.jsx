import React, { createContext, useState, useEffect } from 'react';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const loggedUser = localStorage.getItem('username');
    if (loggedUser) {
      setUsername(loggedUser);
    }
  }, [setUsername]);

  return (
    <LoginContext.Provider value={{ username, setUsername }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;