import { createBrowserRouter } from 'react-router-dom';
import { AppTemplate } from '@/lib/components/AppTemplate';
import { HomePage, UploadPage } from '@/routes';

export const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppTemplate />,
    children: [
      {
        path: '/',
        element: <UploadPage />,
      },
      {
        path: '/upload',
        element: <HomePage />,
      },
    ],
  },
]);
