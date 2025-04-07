import { RouterProvider } from 'react-router';
import { router } from './core/router';

export function App() {
  return <RouterProvider router={router} />;
}
