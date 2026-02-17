import { Link, Outlet } from "react-router";


const AdminLayout =() => {

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
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default AdminLayout;