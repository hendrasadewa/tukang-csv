import { createBrowserRouter } from 'react-router-dom';
import AppTemplate from './components/AppTemplate';
import UploadScreen from './screen/UploadScreen';
import PreviewScreen from './screen/PreviewScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppTemplate />,
    children: [
      {
        path: '/',
        element: <UploadScreen />,
      },
      {
        path: '/preview',
        element: <PreviewScreen />,
      },
    ],
  },
]);
