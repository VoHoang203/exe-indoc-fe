import { createContext, useContext, useEffect, useState } from "react"
import { getAccessToken } from "../utils/auth"
export interface User {
    user: string;
    avatar: string;
    email: string;
    password: string;
    bankAccount: string;
    bankCV: string;
  }
interface AppContextInterface{
    isAuthenticated: boolean
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    reset: () => void
}
const initialAppContext : AppContextInterface = {
    isAuthenticated: Boolean(getAccessToken()),
    setIsAuthenticated:()=>null,
    user: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) as User : null,
    setUser: () => {},
    reset: () => {},
}
export const AppContext= createContext<AppContextInterface>(initialAppContext)

export const useAuth = () => useContext(AppContext);

export const AppProvider = ({children}:{children:React.ReactNode})=>{
    useEffect(() => {
        const checkAuth = () => {
          const token = getAccessToken();
          if (!token) {
            setIsAuthenticated(false);
            setUser(null);
          }
        };
      
        checkAuth();
      }, []);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return Boolean(getAccessToken());
    });
      const [user, setUser] = useState<User | null>(() => {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo) : null;
      });
      const reset = () => {
        setIsAuthenticated(false)
        setUser(null)
    }
    return( <AppContext.Provider value={{
        isAuthenticated, setIsAuthenticated, user, setUser,reset 
    }}>{children}</AppContext.Provider>)
}