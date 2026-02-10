

const Login =() => {

    return (
        <>
        <div className="container d-flex flex-column justify-content-center align-items-center my-5">
            <h4 className="mb-3">請先登入</h4>
            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                <label htmlFor="floatingPassword">Password</label>
            </div>
            <button type="button" className="btn btn-primary my-4">登入</button>
        </div>
        </>
    )
}

export default Login;