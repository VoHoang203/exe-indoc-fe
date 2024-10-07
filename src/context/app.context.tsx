import { createContext, useContext, useEffect, useState } from "react"
import { getAccessToken } from "../utils/auth"
export interface User {
    user: string;
    avatar: string;
    email: string;
    password: string;
    bankAccount?: string;
    bankCV?: string;
    createdAt: string;
    isVerified: boolean
    role: string
    storeName?: string
    phoneNumber: string
    bankName?: string
    bankAccountNumber?: string
    bankOwnerName?: string
    electronicInvoiceEmail?: string
    accountBalance?: string
  }
  
  
interface AppContextInterface{
    isAuthenticated: boolean
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    reset: () => void
    isSeller: boolean;
    setIsSeller: React.Dispatch<React.SetStateAction<boolean>>;
}
const initialAppContext : AppContextInterface = {
    isAuthenticated: Boolean(getAccessToken()),
    setIsAuthenticated:()=>null,
    user: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) as User : null,
    setUser: () => {},
    reset: () => {},
    isSeller: false, // Initialize isSeller
    setIsSeller: () => {}, // Initialize setIsSeller
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
      const [isSeller, setIsSeller] = useState<boolean>(false); 
      const reset = () => {
        setIsAuthenticated(false)
        setUser(null)
        setIsSeller(false);
    }
    return( <AppContext.Provider value={{
        isAuthenticated, setIsAuthenticated, user, setUser,reset ,setIsSeller, isSeller
    }}>{children}</AppContext.Provider>)
}