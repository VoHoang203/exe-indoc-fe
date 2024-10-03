import React from "react";
import RegisterHeader from "../RegisterHeader";
import Footer from "../Footer";
interface Props {
  children?: React.ReactNode;
}
const AuthForm = ({ children }: Props) => {
  return (
    <>
      <RegisterHeader />
        <div className="py-8 bg-gray-100 h-[100vh]">
          {children}
        </div>
      
      <Footer />
    </>
  );
};

export default AuthForm;
