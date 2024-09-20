import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import { Toaster } from 'sonner';

import '@radix-ui/themes/styles.css';
import './index.css';

import router from './lib/components/BrowserRouter';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme>
      <Toaster position="bottom-center" />
      <RouterProvider router={router} />
    </Theme>
  </StrictMode>
);
