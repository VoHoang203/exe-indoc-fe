import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AppProvider } from './context/app.context.tsx'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </AppProvider>
  </StrictMode>,
)
