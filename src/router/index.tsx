import { createBrowserRouter } from 'react-router-dom';
import { AppTemplate } from '@/lib/components/AppTemplate';

import { FilesPage } from './FilesPage';

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppTemplate />,
    children: [
      {
        path: '/',
        element: <>Hello</>,
      },
      {
        path: '/files',
        element: <FilesPage />,
      },
    ],
  },
]);

export default browserRouter;
