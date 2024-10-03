
import {  useState } from "react";

import { FaUser, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth, User } from "../../context/app.context";
import { useMutation } from "@tanstack/react-query";
import http from "../../utils/http"
import { Link } from 'react-router-dom'
import { getAccessToken, removeTokens } from "../../utils/auth";
import logo_indocs from '../../assets/logo_indocs.png'
const Header = () => {
  const [isOpen,setOpen] = useState(false)
  const {isAuthenticated,setUser,setIsAuthenticated,reset} = useAuth()
  const user = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) as User : null
  const navigate = useNavigate()
  console.log("header login",isAuthenticated )
  console.log("header login",user )
  const logoutMutation = useMutation({
    mutationFn:async (): Promise<void> =>{
      const response = await http.delete('v1/logout');
      console.log(response)
    },
    onSuccess: () => {
      setIsAuthenticated(false)
      setUser(null)
      removeTokens();
      setOpen(prev=>!prev)
      reset()
      window.location.href = '/login';
    },
    onError: (error) => {
      setIsAuthenticated(false)
      setUser(null)
      removeTokens();
      setOpen(prev=>!prev)
      reset()
      window.location.href = '/login';
      console.error("Logout failed:", error);
    },
  });
  const logout = () => {
    logoutMutation.mutate();
  };
  const toggleDropDown =()=>{setOpen(prev=>!prev)}
  console.log(user?.avatar)
  console.log("header login2",isAuthenticated )
  console.log("header login2",getAccessToken() )
  return (
    <header className="shadow sticky top-0 z-50 ">
      
      <div className="w-full bg-white ">
        <div className="container mx-auto flex justify-between items-center py-2 px-6">
          
            <nav className="flex-shrink-0">
              <img
                src={logo_indocs} // Đường dẫn đến file ảnh logo của bạn
                alt="Logo"
                className=" w-32 h-auto" // Giữ nguyên các class CSS để đảm bảo kích thước phù hợp
              />
            </nav>
            <nav className=" hidden md:flex justify-center space-x-8">
            <Link
                to="/"
                className="text-center my-auto text-black hover:underline"
              >
                Trang chủ
              </Link>
              <Link
                to="/service"
                className="text-center my-auto text-black hover:underline"
              >
                Dịch vụ
              </Link>
              <Link
              to="/news"
              className="text-center my-auto text-black hover:underline"
            >
              Tin tức
            </Link>
              
            </nav>
              
            <div className=" flex justify-between space-x-1 ">
              <div className="relative">
              {isAuthenticated   &&
                (<button
                className="flex items-center space-x-2 focus:outline-none"
                  onClick={toggleDropDown}
                  aria-haspopup ="true"
                  aria-expanded = {isOpen}
                  >
                    {user && user.avatar ? (
                      <img src={user.avatar} alt="User avatar" className="h-8 w-8 rounded-full object-cover" />
                    ) : (
                      <FaUser className="h-5 w-8 rounded-full" />
                    )}
                    
                    <FaChevronRight className={`text-gray-500 transition-transform duration-150 ${isOpen? "transform rotate-90":""}`}/>
                </button>
                )}
              {!isAuthenticated   &&
                (<div className="flex space-x-2">
                  <Link className="flex w-[150px] h-[40px] items-center justify-center rounded-xl bg-transparent hover:border-black hover:border-1 px-2 text-sm uppercase text-black hover:bg-gray-200"
                  to="/register" onClick={() => console.log("Register clicked")}
                  >
                    
                    Đăng ký
                  </Link>
                <Link className=" flex  align-center w-[150px] h-[40px] items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-2 text-sm uppercase text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-800"
                to="/login">
                  
                  Đăng nhập
                </Link>
              </div>
              )}
              
              
              {isAuthenticated&&isOpen&&(<div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <button
                    onClick={() => {navigate("/profile")}}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <span className="mr-3" /> Thông tin cá nhân
                  </button>
                  <button
                    onClick={() => {navigate("/registerseller")}}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <span className="mr-3" /> Chuyên kênh người bán
                  </button>
                  <button
                    onClick={()=>{logout()}}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <span className="mr-3" /> Đăng xuất
                  </button>
              </div>)}
              </div>
            </div>
    </div>
      </div>
    </header>
  );
};

export default Header;
