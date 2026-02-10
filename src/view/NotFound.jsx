import { useEffect } from "react";
import { useNavigate } from "react-router";


const NotFound=() => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(()=>{
            navigate('/', {replace: true})
        },2000)

        return () => clearTimeout(timer);
    }, [navigate])

    return (
        <>
            <div className="container mt-5 text-center">
                <h5>錯誤頁面</h5>
                <p>即將跳轉至首頁...</p>
            </div>
        </>
    )
}

export default NotFound;