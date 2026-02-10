import MainLayout from "../layout/MainLayout";
import Home from "../view/fronts/Home";
import Login from "../view/Login";
import Products from "../view/fronts/Products";
import SingleProduct from "../view/fronts/SingleProduct";
import Carts from "../view/fronts/Carts";
import Checkout from "../view/fronts/Checkout";
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
            {
                path:'/checkout',
                element: <Checkout />
            },
        ]
    },
    {
        path:'*',
        element: <NotFound />
    },
]

export default routes;