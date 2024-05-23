
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import useAuth from '../hooks/useAuth'
import Header from '../components/Header';
import Home from '../components/pages/Home';
import Login from '../components/pages/Login';

const guestRouter = createBrowserRouter([
    {
        path: '/',
        element: <>
            <Header />
            <Outlet />
        </>,
        children: [
            {index: true, element: <Home />}
        ]
    },
    {
        path: 'login',
        element: <Login />
    },
    {
        path: "*",
        element: <>
            <h1>Page not found</h1>
        </>
    },
])

const userRouter = createBrowserRouter([
    {
        path: "*",
        element: <>
            <h1>Page not found</h1>
        </>
    },
    {
        path: '/',
        element: <>
            <Header />
            <Outlet />
        </>,
        children: [
            {index: true, element: <Home />},
            {path: 'test', element: <h1>Test Path</h1>},
        ]
    }
])

export default function AppRoute() {
  const { user } = useAuth()!;
  const finalRoter = user?.user_id ? userRouter : guestRouter;
  return <RouterProvider router={finalRoter}/>
}
