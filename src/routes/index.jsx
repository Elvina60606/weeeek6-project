import MainLayout from "../layout/MainLayout";
import Home from "../view/fronts/Home";
import Login from "../view/Login";
import Products from "../view/fronts/Products";
import Carts from "../view/fronts/Carts";
import NotFound from "../view/NotFound";
import AdminLayout from "../layout/AdminLayout";
import AdminProducts from "../view/admin/AdminProducts";
import AdminOrders from "../view/admin/AdminOrders";

import ProtectedRoute from "./ProtectedRoute";

const routes = [
    {
        path:'/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path:'login',
                element: <Login />
            },
            {
                path:'products',
                element: <Products />
            },
            {
                path:'carts',
                element: <Carts />
            },
        ]
    },
    {
        path: 'admin',
        element: 
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>,
        children: [
            {
                path: 'product',
                element: <AdminProducts />,
            },
            {
                path: 'order',
                element: <AdminOrders />,
            },
        ]
    },
    {
        path:'*',
        element: <NotFound />
    },
]

export default routes;