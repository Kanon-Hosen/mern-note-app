import React from 'react';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import AddNote from '../components/AddNote';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const MainRoute = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <PrivateRoute><Home></Home></PrivateRoute>,
            children: [
                {
                    path: '/:id',
                    element:<AddNote></AddNote>
                }
            ]
        },
        {
            path: "/login",
            element: <Login></Login>
        },
        {
            path: "/register",
            element: <Register></Register>
        }
    ]);
    return (
        <RouterProvider router={router}/>
    );
};

export default MainRoute;