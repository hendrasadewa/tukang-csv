import { createBrowserRouter } from 'react-router-dom';

import { AppTemplate } from '@/components/templates/AppTemplate';
import { DashboardPage } from '@/pages/DashboardPage';

export const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppTemplate />,
    children: [
      {
        path: '/',
        element: <>Hello</>,
      },
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
    ],
  },
]);
