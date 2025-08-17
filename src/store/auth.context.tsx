import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  getLocalStorageToken,
  setLocalStorageTokenExpiryDate,
  setLocalStorageToken,
  getLocalStorageTokenExpiryDate,
  removeLocalStorageToken,
  removeLocalStorageTokenExpiryDate,
} from "../utils/auth";
import axiosInstance from "../api/axios.config";
import { ApiEndpoints } from "../utils/enums/api-endpoints.enum";
import type { User } from "../utils/models/user.model";
import type { AuthContextType } from "../utils/types/auth.types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(getLocalStorageToken());
  const [tokenExpiryDate, setTokenExpiryDate] = useState<string | null>(
    getLocalStorageTokenExpiryDate()
  );
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

  useEffect(() => {
    setIsAuthenticated(!!token);

    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      setLocalStorageToken(token);
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"];
      removeLocalStorageToken();
      removeLocalStorageTokenExpiryDate();
    }
  }, [token]);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await axiosInstance.post(ApiEndpoints.AuthLogin, {
        username: username,
        password: password,
      });

      if (response.status !== 200) {
        console.error("Login failed:", response.data);
        return false;
      }

      setLocalStorageToken(response.data.token);
      setLocalStorageTokenExpiryDate(
        new Date(response.data.expiryDate).toISOString()
      );
      setToken(response.data.token);
      setTokenExpiryDate(new Date(response.data.expiryDate).toISOString());
      setUser({ id: response.data.id, username: username });
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setTokenExpiryDate(null);
    setUser(null);
    setIsAuthenticated(false);
    removeLocalStorageToken();
    removeLocalStorageTokenExpiryDate();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
