import { createBrowserRouter } from 'react-router-dom';
import { AppTemplate } from '@/lib/components/AppTemplate';

import { DashboardPage } from '@/pages/DashboardPage';

const BrowserRouter = createBrowserRouter([
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

export default BrowserRouter;
