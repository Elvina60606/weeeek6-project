import axios from "axios";
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { ThreeDots } from "react-loader-spinner";

const { VITE_URL, VITE_PATH } = import.meta.env;


const Carts =() => {
    const [ carts, setCarts ] = useState([]);
    const [ loadingTrashId, setLoadingTrashId ] = useState(null);

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
        setLoadingTrashId(id);
        try {
            const response = await axios.delete(`${VITE_URL}/v2/api/${VITE_PATH}/cart/${id}`)
            alert(response.data.message)
            setCarts((prev)=> prev.filter((item) => item.id !== id));
        } catch (error) {
            console.log("刪除購物車:", error)
        } finally {
            setLoadingTrashId(null);
        }
    }

    // *** 表單驗證 useform 基本配備 ***
    const {
        register,
        handleSubmit,
        reset,
        formState:{ errors, isValid },
    } = useForm({
        mode: 'onChange',
    });

    // 綁定 formData 送出訂單
    const onSubmit = async(FormData) =>{
        const data = {
                "user": FormData,
                "message": FormData.message,
        }

        try {
            const response = await axios.post(`${VITE_URL}/api/${VITE_PATH}/order`, { data })
            alert(response.data.message);
            setCarts([]);
            reset();
        } catch (error) {
            console.log("送出訂單：",error)
        }
    }

    return(
        <>
        
            <div className="container">
                { /* 購物車資料 */}
                    <div className="row justify-content-center">
                    { carts?.length === 0 ? (
                        <div className="text-center mt-5">
                            <h5>購物車內沒有商品。</h5>
                        </div> ) : (
                        <>
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
                                                                    {loadingTrashId === cart.id ? (
                                                                        <ThreeDots visible={true}
                                                                            height="25"
                                                                            width="25"
                                                                            color="white"
                                                                            radius="9"
                                                                            ariaLabel="three-dots-loading"
                                                                            wrapperStyle={{}}
                                                                            wrapperClass=""
                                                                        />
                                                                    ) : (
                                                                        <i className="bi bi-trash3"></i>
                                                                    )}
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                            </div>
                    
                            {/* 收件人資料 */}
                            <div className="my-5 row justify-content-center">
                                    <form className="col-md-6" onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            className="form-control"
                                            placeholder="請輸入 Email"
                                            {...register('email', {
                                                required: '請輸入 Email',
                                                pattern: {
                                                    value: /^\S+@\S+$/i,
                                                    message: "Email 格式不正確",
                                                }
                                            })}
                                        />
                                        { errors.email && (
                                                <p className="text-danger">{errors.email.message}</p>   
                                            )}
                                        </div>

                                        <div className="mb-3">
                                        <label htmlFor="name" className="form-label">
                                            收件人姓名
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            className="form-control"
                                            placeholder="請輸入姓名"
                                            {...register('name',{
                                                required: '請輸入收件人姓名',
                                                minLength: {
                                                    value: 2,
                                                    message: '收件人姓名至少 2 個字'
                                                }
                                            })}
                                        />
                                        { errors.name && (
                                                <p className="text-danger">{errors.name.message}</p>  
                                            )}
                                        </div>

                                        <div className="mb-3">
                                        <label htmlFor="tel" className="form-label">
                                            收件人電話
                                        </label>
                                        <input
                                            id="tel"
                                            name="tel"
                                            type="tel"
                                            className="form-control"
                                            placeholder="請輸入電話"
                                            {...register('tel',{
                                                required: '請輸入電話',
                                                minLength:{
                                                    value: 8,
                                                    message: '電話號碼至少 8 碼'
                                                },
                                                pattern: {
                                                    value:  /^\d+$/,
                                                    message: '只能輸入數字'
                                                }
                                            })}
                                        />
                                        { errors.tel && (
                                            <p className="text-danger">{errors.tel.message}</p>  
                                        )}
                                        </div>

                                        <div className="mb-3">
                                        <label htmlFor="address" className="form-label">
                                            收件人地址
                                        </label>
                                        <input
                                            id="address"
                                            name="address"
                                            type="text"
                                            className="form-control"
                                            placeholder="請輸入地址"
                                            {...register('address',{
                                                required: '請輸入收件人地址',
                                            })}
                                        />
                                        </div>
                                            { errors.address && (
                                                <p className="text-danger">{errors.address.message}</p> 
                                            )}
                                        <div className="mb-3">
                                        <label htmlFor="message" className="form-label">
                                            留言
                                        </label>
                                        <textarea
                                            id="message"
                                            className="form-control"
                                            cols="30"
                                            rows="10"
                                            {...register('message')}
                                        ></textarea>
                                        </div>
                                        <div className="text-end">
                                        <button type="submit" className="btn btn-danger" disabled={!isValid}>
                                            送出訂單
                                        </button>
                                        </div>
                                    </form>
                            </div>
                        </>
                    )}
                    </div>
            </div>
        </>
    )
}

export default Carts;