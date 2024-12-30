import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './store/store';
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from "./router.ts";
import { ThemeProvider } from "@material-tailwind/react";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
