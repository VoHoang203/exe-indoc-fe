
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import AuthForm from './pages/AuthenLayouts'
import Login from './pages/Login'
import Register from './pages/Register'
import MainLayout from './pages/MainLayout'
import MainContent from './pages/MainContent/MainContent'
import ListItems from './pages/ListItem'
import { useAuth } from './context/app.context'
import SellerProfile from './pages/SellerProfile/SellerProfile'
import NewsPage from './pages/News/NewsPage'
import SellerRegistration from './pages/SellerRegister/SellerRegistration'
import Payment from './pages/Payment/Payment'
import { toast } from 'react-toastify'




 function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    toast.error('Bạn cần đăng nhập để truy cập trang này');
    return <Navigate to='/login' />;
  }

  return <Outlet />;
 }

function RejectedRoute() {
  const {isAuthenticated} = useAuth()
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRoute() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: "/login",
          index: true,
          element: (
            <AuthForm>
              <Login />
            </AuthForm>
          )
        },
        {
          path: "/register",
          element: (
            <AuthForm>
              <Register />
            </AuthForm>
          )
        },
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
       
        
        {
          path: "/profile", // Update this path to use SellerProfile
          element: (
            <MainLayout>
              <SellerProfile /> 
            </MainLayout>
          )
        },
        {
          path: "/registerseller",
          element: (
            <MainLayout>
              <SellerRegistration />
            </MainLayout>
          )
        },
        {
          path: "/payment",
          element: (
            <MainLayout>
              <Payment />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: "/",
      index: true,
      element: (
        <MainLayout>
          <MainContent />
        </MainLayout>
      )
    },{
      path: "/service",
      element: (
        <MainLayout>
          <ListItems />
        </MainLayout>
      )
    },
    {
      path: "/news",
      element: (
        <MainLayout>
          <NewsPage />
        </MainLayout>
      )
    }
  ]);
  return routeElements;
}
