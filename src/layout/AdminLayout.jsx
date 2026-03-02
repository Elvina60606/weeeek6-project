import axios from "axios";
import { Link, Outlet, useNavigate } from "react-router";
import { getAsyncMessage } from "../slices/messageSlice";
import { useDispatch } from "react-redux";

const { VITE_URL, VITE_PATH } = import.meta.env


const AdminLayout =() => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async() => {
        try {
            const res = await axios.post(`${VITE_URL}/v2/logout`);
            dispatch(getAsyncMessage(res.data))
            
            setTimeout(() => {
                navigate('/', {replace: true})
            }, 1000)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <div className="collapse navbar-collapse"       
                         id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='/' className="nav-link" > 首頁 </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/admin/product' className="nav-link" > 後台產品列表 </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/admin/order' className="nav-link" > 後台訂單列表 </Link>
                            </li>
                            <button type="button" className="btn btn-warning rounded-4"
                                    onClick={()=>handleLogout()}>後台登出</button>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default AdminLayout;