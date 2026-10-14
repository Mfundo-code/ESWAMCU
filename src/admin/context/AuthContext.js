import React, { createContext, useContext, useState } from "react";
import { getStoredAdminUser, loginAdmin, logoutAdmin, setStoredAdminUser } from "../../global/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));
  const [username, setUsername] = useState(() => getStoredAdminUser());

  const login = async (user, password) => {
    const res = await loginAdmin(user, password);
    localStorage.setItem("authToken", res.data.token);
    setStoredAdminUser(user);
    setToken(res.data.token);
    setUsername(user);
  };

  const logout = () => {
    logoutAdmin();
    setToken(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ token, username, isAuthed: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
