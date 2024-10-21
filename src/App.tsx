import { Route, Routes } from 'react-router-dom';
import './App.css'
import './index.css'

import useRoute from './useRoute'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from './pages/Admin/layouts/admin';
import { ChakraProvider } from '@chakra-ui/react';
import { useState } from 'react';
import initialTheme from '././components/theme/theme.tsx'; //  { themeGreen }

function App() {
  const routeElements = useRoute()
  const [currentTheme, setCurrentTheme] = useState(initialTheme);

  return (
    <>
      <ChakraProvider theme={currentTheme}>
        {routeElements}
        <Routes>
          <Route
            path="admin/*"
            element={
              <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
            }
          />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" />
      </ChakraProvider>
    </>
  )
}

export default App
