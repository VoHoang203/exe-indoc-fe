import React from 'react'
import Header from '../Header/Header';
import Footer from '../Footer';
import Breadcrumbs from '../../components/BreadCrumbs';
interface Props {
    children?: React.ReactNode;
  }
const MainLayout = ({ children }: Props) => {
  return (
    <div className='bg-gradient-to-b from-blue-50 to-blue-100 animate-fadeIn'>
      <Header/>
      <Breadcrumbs />
        <div className='py-0 w-full  px-[5%] mt-5 animate-fadeIn'>
          {children}
         </div>
      <Footer />
    </div>
  )
}

export default MainLayout