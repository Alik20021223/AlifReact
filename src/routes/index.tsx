import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import RecipteShowPage from '../pages/RecipteShowPage';
import AdminPage from '../pages/AdminPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/recipe/:id",
    element: <RecipteShowPage />,
  },
  {
    path: "admin",
    element: <AdminPage />
  }
]);

export default router;