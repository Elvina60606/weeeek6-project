import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Modal from 'bootstrap/js/dist/modal';

const { VITE_URL, VITE_PATH } = import.meta.env;

const SingleProduct =({myproductModal, productId}) => {
    
    const [ product, setProduct ] = useState([]);
    const productModalRef = useRef(null);

    useEffect(() => {
        myproductModal.current = new Modal(productModalRef.current);
    },[myproductModal])

    useEffect(() => {
        (async() => {
            try {
                const response = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/product/${productId}`)
                setProduct(response.data.product);
            } catch (error) {
                console.log("單一產品頁面：", error)
            }
        })();
    }, [productId]);

    // 調整商品數量
    const [ qty, setQty ] = useState(1);

    const handleIncrease =() => {
        if( qty >= 10) return;
        setQty(prev=> prev + 1);
    };

    const handleDecrease =() => {
        if( qty <= 1) return;
        setQty(prev => prev -1);
    };

    const handleOnChange =(e) => {
        setQty(Number(e.target.value));
    }
    
    // 加入購物車
    const addCarts= async() => {
        const data = {
            "product_id": productId,
            "qty": qty
        };

        try {
            const response = await axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/cart`, {data})
            alert(response.data.message)
        } catch (error) {
            console.log("加入購物車：",error)
        };

        myproductModal.current.hide();
        setQty(1)
    };

    return (
        <>
            <div className="modal" id="productModal" ref={productModalRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{product.title}</h5>
                            <button type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body">
                            <img className="w-100" src={product.imageUrl} />
                            <p className="mt-3">{product.description}</p>
                            <p className="mt-3">{product.content}</p>
                            <p>價錢：<del>原價${product.origin_price}</del>，特價：${product.price}</p>
                            <div className="d-flex align-items-center">
                                <label style={{ width: "150px" }}>購買數量：</label>
                                <button className="btn btn-danger"
                                        type="button"
                                        onClick={()=>{handleDecrease()}}>
                                    <i className="fa-solid fa-minus"></i>
                                </button>
                                <input className="form-control"
                                       type="number"
                                       name="qty"
                                       value={qty}
                                       onChange={(e)=>handleOnChange(e)}/>
                                <button className="btn btn-primary"
                                        type="button"
                                        onClick={()=>{handleIncrease()}}>
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={()=>addCarts()} type="button" className="btn btn-primary">
                                加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleProduct;