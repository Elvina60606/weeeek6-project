import { useEffect, useState, useRef } from "react";

import axios from "axios";
import SingleProduct from "./SingleProduct";

const { VITE_URL, VITE_PATH } = import.meta.env;

const Products=() => {
    const [ products, setProducts ] = useState([]);
    const [ productId, setProductId ] = useState(null);

    useEffect(()=> {
        (async() => {
            try {
                const response = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/products/all`)
                setProducts(response.data.products)
            } catch (error) {
                console.log("取得產品列表：", error)
            }
        })()
    },[]);

    const myproductModal = useRef(null);
    const openProductModal =(id) => {
        myproductModal.current.show();
        setProductId(id);
    };

    return(
        <>
            <div className="container my-4">
                <h4 className="mb-3">商品列表</h4>
                    { products.map((product) => {
                        return (
                            <div className="card mb-3" key={product.id} style={{maxWidth: 540}}>
                                <div className="row g-0">
                                    <div className="col-md-5">
                                        <img src={product.imageUrl} className="img-fluid rounded-start" alt="..." />
                                    </div>
                                    <div className="col-md-7">
                                        <div className="card-body">
                                            <h5 className="card-title">{product.title}</h5>
                                            <p className="card-text">{product.description}</p>
                                            <button onClick={()=>openProductModal(product.id)} type="button" className="btn btn-success">click</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        })
                    }
            </div>
            <SingleProduct myproductModal={myproductModal}
                           productId={productId}/>
        </>
    )
}

export default Products;