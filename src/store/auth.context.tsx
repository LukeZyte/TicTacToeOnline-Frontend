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
} from "../utils/auth";
import axiosInstance from "../api/axios.config";
import { ApiEndpoints } from "../utils/enums/api-endpoints.enum";
import type { User } from "../utils/models/user.model";

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (login: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(getLocalStorageToken());
  const [tokenExpiryDate, setTokenExpiryDate] = useState<string | null>(
    getLocalStorageTokenExpiryDate()
  );
  const [user, setUser] = useState<User | null>(null);

  let isAuthenticated = !!token;

  useEffect(() => {
    isAuthenticated = !!token;

    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      setLocalStorageToken(token);
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = async (login: string, password: string) => {
    const response = await axiosInstance.post(ApiEndpoints.AuthLogin, {
      login: login,
      password: password,
    });

    if (response.status !== 200) {
      console.error("Login failed:", response.data);
      return;
    }

    console.log("LOG IN:", response.data);
    setLocalStorageToken(response.data.token);
    setLocalStorageTokenExpiryDate(
      new Date(response.data.expiryDate).toISOString()
    );
    setToken(response.data.token);
    setTokenExpiryDate(new Date(response.data.expiryDate).toISOString());
    setUser({ id: response.data.id, username: login });
    isAuthenticated = !!token;
  };

  const logout = () => {
    setToken(null);
    setTokenExpiryDate(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
