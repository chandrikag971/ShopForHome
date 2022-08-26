import React, { useContext, useState } from 'react'
import toast from "react-hot-toast"
import UserContext from '../../context/UserContext/UserContext'

function ProductCreate() {
    const {token} = useContext(UserContext)
    const [product,setProduct] = useState({
        productName:"",
        companyName:"",
        price:0,
        tags:"",
        stock:10
    })

    const handleChange = (e) => {
        setProduct({...product,[e.target.name]:e.target.value})
    }
    

    const createProduct = () => {
        fetch(`http://localhost:9000/admin/products/create-one`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(product)
        })
        .then(res => res.json())
        .then(result => {
            toast.success("Product Created Successfully")
            setProduct(() => {
              return {
                productName: "",
                companyName: "",
                price: 0,
                tags: "",
                stock: 10,
              };
            });
        }).catch(err=>{
            toast.error("Product Creation Failed")
        })
    }



    return (
        <div>
            <div className="container">
                <h3 className="textHeadStyle my-2">Create Product </h3>
                <form>
                    <div className="form-floating mb-3">
                        <input name="productName" type="text" className="form-control" placeholder="RoyalBlueSofa" onChange={handleChange} value={product.productName} />
                        <label htmlFor="floatingInput">Product Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input name="companyName" type="text" className="form-control" placeholder="RoaylSofa" onChange={handleChange} value={product.companyName} />
                        <label htmlFor="floatingInput">Company Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input name="price" type="number" className="form-control" placeholder="500" onChange={handleChange} value={product.price} pattern="^[0-9]*$"/>
                        <label htmlFor="floatingInput">Price</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input name="tags" type="text" className="form-control" placeholder="decor,sofa" onChange={handleChange} value={product.tags} />
                        <label htmlFor="floatingInput">Tags</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input name="stock" type="number" className="form-control" placeholder="10" onChange={handleChange} value={product.stock} pattern="^[0-9]*$" />
                        <label htmlFor="floatingInput">Stock</label>
                    </div>
                    <button type="button" className="btn btn-primary btn-lg space bg-btn" onClick={createProduct}>Create</button>
                </form>
            </div>
        </div>
    )
}

export default ProductCreate
