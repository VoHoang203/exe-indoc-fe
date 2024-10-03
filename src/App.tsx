

import './App.css'
import './index.css'

import useRoute from './useRoute'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const routeElements = useRoute()

  return (
    <>
    
      {routeElements}
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
    theme="light"/>
    </>
  )
}

export default App
