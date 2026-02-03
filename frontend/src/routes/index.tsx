import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import CoursePlayer from '../pages/CoursePlayer';
import Exam from '../pages/Exam';
import PrivateRoute from './PrivateRoute';
import MainLayout from '../components/layout/MainLayout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <Signup />,
            },
            {
                path: '/courses',
                element: <div className="p-8 font-bold">Courses Page Coming Soon</div>,
            },
            {
                path: '/categories',
                element: <div className="p-8 font-bold">Categories Page Coming Soon</div>,
            },
            {
                path: '/dashboard',
                element: <div className="p-8 font-bold">Dashboard Coming Soon</div>,
            },
            {
                element: <PrivateRoute />,
                children: [
                    {
                        path: '/course/:id',
                        element: <CoursePlayer />,
                    },
                    {
                        path: '/exam/:id',
                        element: <Exam />,
                    },
                ],
            },
        ],
    },
]);

export const AppRouter = () => {
    return <RouterProvider router={router} />;
};
