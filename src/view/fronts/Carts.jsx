import axios from "axios";
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useEffect, useState } from "react"

const { VITE_URL, VITE_PATH } = import.meta.env;


const Carts =() => {
    const [ carts, setCarts ] = useState([]);

    useEffect(() => {
        (async() => {
            try {
                const response = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/cart`)
                setCarts(response.data.data.carts)
            } catch (error) {
                console.log("取得購物車:", error)
            }
        })()
    },[])

    // 刪除購物車(id)
    const delCart = async(id) =>{
        try {
            const response = await axios.delete(`${VITE_URL}/v2/api/${VITE_PATH}/cart/${id}`)
            alert(response.data.message)
            setCarts((prev)=> prev.filter((item) => item.id !== id));
        } catch (error) {
            console.log("刪除購物車:", error)
        }
    }

    return(
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-8">
                        <h3 className="my-4">購物車</h3>
                        <table className="table table-striped text-end">
                            <thead>
                                <tr>
                                    <th className="text-start" width="35%">商品</th>
                                    <th className="text-center">數量</th>
                                    <th>單價</th>
                                    <th>小計</th>
                                    <th>刪除</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    carts?.map((cart) => {
                                        return (
                                            <tr key={cart.id}>
                                                <td className="text-start">{cart.product.title}</td>
                                                <td className="text-center">{cart.qty}</td>
                                                <td>${cart.product.price}</td>
                                                <td>${cart.qty * cart.product.price}</td>
                                                <td>
                                                    <button type="button"
                                                            className="btn btn-danger btn-sm"
                                                            onClick={()=>{delCart(cart.id)}}>
                                                        <i className="bi bi-trash3"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Carts;