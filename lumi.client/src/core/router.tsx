import { DashboardPage } from '@/pages/dashboard/dashboard.page';
import { createBrowserRouter } from 'react-router';
import { AppLayout } from './layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />, 
    children: [
      {
        index: true, 
        element: <DashboardPage />
      }
    ]
  }
]);
