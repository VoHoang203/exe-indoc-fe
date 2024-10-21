import React from "react";
import RegisterHeader from "../RegisterHeader";
import Footer from "../Footer";
interface Props {
  children?: React.ReactNode;
}
const AuthForm = ({ children }: Props) => {
  return (
    <>
    <div className='bg-gradient-to-b from-blue-50 to-blue-100 animate-fadeIn'>
      <RegisterHeader />
        <div className="py-8 bg-gray-100 h-[100vh]">
          {children}
        </div>
      
      <Footer />
      </div>
    </>
  );
};

export default AuthForm;
