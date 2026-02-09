import { createContext, useContext } from "react";

export interface AuthContextType {
  username: string | null;
  token: string | null;
  login: (username: string, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}


export const AuthContext = createContext<AuthContextType>({
  username: null,
  token: null,
  login: () => {},
  isAuthenticated: false,
  logout:() => {}
});

export const useAuth = () => useContext(AuthContext);
