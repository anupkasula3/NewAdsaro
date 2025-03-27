"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface PublisherData {
  id: number;
  name: string;
  timestamp: string;
  email: string;
  website: string;
  address_apt: string;
  address_city: string;
  address_country: string;
  address_state: string;
  address_street: string;
  address_zip: string;
  balance: number;
  company: string;
  hide_notifications: boolean;
  login: string;
  other_contacts: string;
  password: string | null;
  password_current: string | null;
  password_repeat: string | null;
  password_stats: string;
  phone: string;
  skype_id: string;
  ui_theme: string;
  website_descr: string;
}


interface AppContext {
  isLogin: boolean;
  token: string | undefined;
  accountType: string | undefined;
  publisherData?: PublisherData; 
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
  const [publisherData, setPublisherData] = useState<PublisherData>();

  const [initializing, setInitializing] = useState(true);

  const fetchData = async (mytoken: string) => {
    try {
      const response = await axios.get(
        `https://panel.adsaro.com/publisher/api/Account?version=4&token=${mytoken}`
      );
      console.log(response.data.response.rows[0]);
      setPublisherData(response.data.response.rows[0]);
    } catch (err) {
      console.log("Error fetching publisher data:", err);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("session_token");
    const storedAccountType = localStorage.getItem("accountType");

    if (storedToken) {
      console.log("Token found:", storedToken);
      console.log("Account Type found:", storedAccountType);
      setToken(storedToken);
      setAccountType(storedAccountType || undefined);
      setIsLogin(true);
      fetchData(storedToken); 
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
    fetchData(token); // Fetch publisher data upon login
    router.push("/dashboard");
  };
  const logout = () => {
    const currentAccountType = accountType; // Store before resetting state
    localStorage.removeItem("session_token");
    localStorage.removeItem("accountType");
    setIsLogin(false);
    setToken(undefined);
    setAccountType(undefined);
    setPublisherData(undefined); 
    if (currentAccountType === "Publisher") {
      router.push("/publisher/login");
    } else {
      router.push("/advertiser/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, accountType, initializing, publisherData, isLogin, login, logout }}
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
