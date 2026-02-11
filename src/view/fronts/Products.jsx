import { useEffect, useState, useRef } from "react";
import { ThreeDots } from "react-loader-spinner";

import axios from "axios";
import SingleProduct from "./SingleProduct";

const { VITE_URL, VITE_PATH } = import.meta.env;

const Products=() => {
    const [ product, setProduct ] = useState([]);
    const [ products, setProducts ] = useState([]);
    const [ loadingProductId, setLoadingProductId ] = useState(null);
    const myproductModal = useRef(null);

    useEffect(()=> {
        (async() => {
            try {
                const response = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/products/all`)
                setProducts(response.data.products);
            } catch (error) {
                console.log("取得產品列表：", error)
            }
        })()
    },[]);


    const handleView = async(id) =>{
        setLoadingProductId(id);
        try {
            const response = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/product/${id}`)
            setProduct(response.data.product);
        } catch (error) {
            console.log("查看更多：", error)
        } finally {
            setLoadingProductId(null);
        }
        myproductModal.current.show();
    }

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
                                            <button onClick={()=>handleView(product.id)} 
                                                    type="button"     
                                                    className="btn btn-success mt-auto"
                                                    disabled={loadingProductId === product.id}>
                                                    { loadingProductId === product.id ? (
                                                        <ThreeDots
                                                            visible={true}
                                                            height="25"
                                                            width="25"
                                                            color="white"
                                                            radius="9"
                                                            ariaLabel="three-dots-loading"
                                                            wrapperStyle={{}}
                                                            wrapperClass=""
                                                        />
                                                    ) : (
                                                        '查看更多'
                                                    )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        })
                    }
            </div>
            <SingleProduct myproductModal={myproductModal}
                           product={product}/>
        </>
    )
}

export default Products;