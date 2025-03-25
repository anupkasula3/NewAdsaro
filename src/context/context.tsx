"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AppContext {
  isLogin: boolean;
  token: string | undefined;
  accountType: string | undefined;
  initializing: boolean;
  login: (token: string, accountType: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AppContext | undefined>(undefined);

interface Props {
  children?: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState<string | undefined>();
  const [accountType, setAccountType] = useState<string | undefined>();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("session_token");
    
    const storedAccountType = localStorage.getItem("accountType");

    if (storedToken) {
      console.log("Token found:", storedToken);
      console.log("Account Type found:", storedAccountType);
      setToken(storedToken);
      setAccountType(storedAccountType || undefined);
      setIsLogin(true);
    }
    setInitializing(false);
  }, []);

  const login = (token: string, accountType: string) => {
    console.log("Logging in with account type:", accountType);
    setToken(token);
    setAccountType(accountType);
    localStorage.setItem("session_token", token);
    localStorage.setItem("accountType", accountType);
    setIsLogin(true);
    router.push("/dashboard");
  };

  const logout = () => {
    const currentAccountType = accountType; // Store before resetting state
    localStorage.removeItem("session_token");
    localStorage.removeItem("accountType");
    setIsLogin(false);
    setToken(undefined);
    setAccountType(undefined);

    if (currentAccountType === "Publisher") {
      router.push("/publisher/login");
    } else {
      router.push("/advertiser/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, accountType, initializing, isLogin, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
