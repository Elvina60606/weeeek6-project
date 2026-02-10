import { Link, Outlet } from "react-router";


const MainLayout =() => {

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse"       
                         id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='/' className="nav-link" > 首頁 </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/products' className="nav-link" > 產品列表 </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/carts' className="nav-link" > 購物車 </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/checkout' className="nav-link" > 結帳 </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/login' className="nav-link" > 登入 </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default MainLayout;