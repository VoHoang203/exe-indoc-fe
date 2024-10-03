import { create } from "zustand";
export interface User {
    uid: string;                    
    email?: string;                   
    username?: string;               
    password?: string;              
    bio?: string;                   
    profilePicURL?: string;           
    followers?: string[];             
    following?: string[];             
    posts?: string[];               
    role?: 'buyer' | 'seller';        
    createdAt?: number;              
    updateAt?: number;     
    isDelete?: boolean;              
  }
interface AuthState {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    setUser: (user: User) => void;
  }
const useAuthStore = create<AuthState>((set) => ({
	user: JSON.parse(localStorage.getItem("user-info") || "null"),
	login: (user) => set({ user }),
	logout: () => set({ user: null }),
	setUser: (user) => set({ user }),
}));

export default useAuthStore;