import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  getToken,
  getUser,
  setToken,
  saveUser,
  removeToken,
  removeUser,
} from "../utils/token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Restore user after page refresh
  useEffect(() => {
    const storedUser = getUser();

    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = ({ token, user }) => {
    setToken(token);
    saveUser(user);

    setUser(user);
  };

  const logout = () => {
    removeToken();
    removeUser();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: !!getToken(),
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return context;
}
