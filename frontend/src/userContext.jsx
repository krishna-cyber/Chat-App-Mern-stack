import { createContext } from "react";
import { useState } from "react";

export const userContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);

  return (
    <userContext.Provider value={{ user, setUser, token, setToken, id, setId }}>
      {children}
    </userContext.Provider>
  );
};
