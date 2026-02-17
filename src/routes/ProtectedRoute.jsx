import { useState, useEffect } from "react";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { Navigate } from "react-router";

const { VITE_URL, VITE_PATH } = import.meta.env;

const ProtectedRoute =({children}) =>{
    const [ isAuth, setIsAuth ] = useState(false);
    const [ loading, setLoading ] = useState(true);


     {/*----抓取token----*/}
    useEffect(() => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("reactToken="))
        ?.split("=")[1]
      if(token){
        axios.defaults.headers.common['Authorization'] = token;
      };

      const checkLogin = async(e) => {
          try {
            const result = await axios.post(`${VITE_URL}/api/user/check`)
            setIsAuth(true)
          } catch (error) {
            console.log(error) 
          } finally{
            setLoading(false)
          }
        }
        checkLogin();

    }, [])

    if(loading) return (<div className="container my-5 text-center">
        <ColorRing visible={true}
                   height="100"
                   width="100"
                   ariaLabel="color-ring-loading"
                   wrapperStyle={{}}
                   wrapperClass="color-ring-wrapper"
                   colors={['#e15b64', '#f47e60', '#26190dff', '#abbd81', '#849b87']}
                   /> 
        </div>);

    if(!isAuth) return <Navigate to='/login' />;  

    
    return children;
}

export default ProtectedRoute;