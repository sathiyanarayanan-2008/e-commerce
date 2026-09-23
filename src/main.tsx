import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import { StoreProvider } from './contexts/StoreContext.tsx'
import { CartProvider } from './contexts/CartContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <StoreProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </StoreProvider>
    </ThemeProvider>
  </StrictMode>,
)
