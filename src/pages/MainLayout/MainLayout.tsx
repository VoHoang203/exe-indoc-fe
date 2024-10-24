import React from 'react'
import Header from '../Header/Header';
import Footer from '../Footer';
import Breadcrumbs from '../../components/BreadCrumbs';
import { Link, useLocation } from 'react-router-dom';

interface Props {
    children?: React.ReactNode;
  }
const MainLayout = ({ children }: Props) => {
  const location = useLocation();
  console.log('test', location.pathname);
  return (
    <div className='bg-[#F5F7FA] animate-fadeIn'>
      <Header/>
      {location.pathname !== '/' && <Breadcrumbs />}  
        <div className='py-0 w-full animate-fadeIn'>
          {children}
         </div>
      <Footer />
    </div>
  )
}

export default MainLayout