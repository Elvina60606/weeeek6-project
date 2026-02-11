import MainLayout from "../layout/MainLayout";
import Home from "../view/fronts/Home";
import Login from "../view/Login";
import Products from "../view/fronts/Products";
import Carts from "../view/fronts/Carts";
import NotFound from "../view/NotFound";

const routes = [
    {
        path:'/',
        element: <MainLayout />,
        children: [
            {
                path:'/',
                element: <Home />
            },
            {
                path:'/login',
                element: <Login />
            },
            {
                path:'/products',
                element: <Products />
            },
            {
                path:'/carts',
                element: <Carts />
            },
        ]
    },
    {
        path:'*',
        element: <NotFound />
    },
]

export default routes;