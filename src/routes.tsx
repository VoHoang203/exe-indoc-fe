import { Icon } from '@chakra-ui/react';
//MD-Lock
import {
  MdPerson,
  MdHome,
  MdOutlineReceiptLong,
  MdOutlinePeopleAlt,
  MdOutlineWallet,
  MdOutlineFeedback,
} from 'react-icons/md';
import Dasboard from './pages/Admin/view/Dasboard';
import OrderManagement from './pages/Admin/view/orders';
import ProductManagement from './pages/Admin/view/products';
import UserManagement from './pages/Admin/view/users';
import Profile from './pages/Admin/view/profile';
import OrderManagement2 from './pages/Admin/view/orders_copy_2';
import ProductManagement3 from './pages/Admin/view/Transaction';

// Admin Imports
// import MainDashboard from 'views/admin/default';
// import Profile from 'views/admin/profile';
// import Orders from 'views/admin/orders';
// import Products from 'views/admin/products';
// import Categories from 'views/admin/categories';
// import Users from 'views/admin/users';

// Auth Imports
// import SignInCentered from 'views/auth/signIn';

const routes = [
  {
    name: 'Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <Dasboard />,
  },
  {
    name: 'Withdraw',
    layout: '/admin',
    path: '/withdraw',
    icon: (
      <Icon
        as={MdOutlineWallet}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <OrderManagement />,
    secondary: true,
  },
  {
    name: 'FeedBack',
    layout: '/admin',
    path: '/feedback',
    icon: (
      <Icon
        as={MdOutlineFeedback}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <OrderManagement2 />,
    secondary: true,
  },
  
  {
    name: 'Transaction',
    layout: '/admin',
    path: '/transaction',
    icon: (
      <Icon
        as={MdOutlinePeopleAlt}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <ProductManagement3 />,
    secondary: true,
  },
  {
    name: 'Product',
    layout: '/admin',
    icon: <Icon as={MdOutlineReceiptLong} width="20px" height="20px" color="inherit" />,
    path: '/product',
    component: <ProductManagement />,
  },
  {
    name: 'User',
    layout: '/admin',
    path: '/user',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <UserManagement />,
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: '/profile',
    icon: <Icon as={MdOutlinePeopleAlt} width="20px" height="20px" color="inherit" />,
    component: <Profile />,
  },
  // {
  //   name: 'Sign In',
  //   layout: '/auth',
  //   path: '/sign-in',
  //   icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
  //   component: <SignInCentered />,
  // },
];

export default routes;
