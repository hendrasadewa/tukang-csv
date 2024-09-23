import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import { Toaster } from 'sonner';
import '@radix-ui/themes/styles.css';

import { browserRouter } from './browserRouter';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme>
      <Toaster position="bottom-center" />
      <RouterProvider router={browserRouter} />
    </Theme>
  </StrictMode>
);
