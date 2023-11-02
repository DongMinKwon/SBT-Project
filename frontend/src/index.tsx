import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/base.scss';
import '@/Global.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from '@/pages/Home';
import ErrorPage from '@/pages/ErrorPage';
import AdminLayout from './components/admin/AdminLayout';
import Admin from './pages/Admin';
import LandingLogin from './pages/LandingLogin';
import Stores from './pages/Stores';
import CreateStore from './pages/CreateStore';
import StoreDetail from './pages/StoreDetail';
import Tokens from './pages/Tokens';
import Boom from './pages/Boom';

if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.log = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.warn = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // console.error = () => {};
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/users',
    element: <Tokens />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/boom',
    element: <Boom />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Admin />,
      },
      {
        path: 'stores',
        element: <Stores />,
      },
      {
        path: 'stores/:store_id',
        element: <StoreDetail />,
      },
      {
        path: 'create-store',
        element: <CreateStore />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LandingLogin />,
    errorElement: <ErrorPage />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  // <React.StrictMode>
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </RecoilRoot>,
  // </React.StrictMode>,
);
