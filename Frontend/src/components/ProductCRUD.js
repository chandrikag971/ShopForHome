import React, { useContext, useState } from 'react'
import UserContext from '../context/UserContext/UserContext'
import BulkUpload from './ProductsCrudComponents/BulkUpload'
import ProductCreate from './ProductsCrudComponents/ProductCreate'
import Stock from './Reports/Stock'

function ProductCRUD() {
    const [crudOption, setCrudOption] = useState("stock")
    const { isLogin, role } = useContext(UserContext)
    
    return (
        <>
            {isLogin && role === "admin" &&
                <div className="button-group">
                    <button className="btn btn-primary" onClick={() => { setCrudOption("bulk") }} >Bulk Upload</button>
                    <button className="btn btn-primary" onClick={() => { setCrudOption("stock") }} >Show Products</button>
                    <button className="btn btn-primary" onClick={() => { setCrudOption("create") }} >Create New Product</button>
                </div>
            }

            {isLogin && role === "admin" && crudOption === "bulk" && <BulkUpload></BulkUpload>}
            {isLogin && role === "admin" && crudOption === "stock" && <Stock></Stock>}
            {isLogin && role === "admin" && crudOption === "create" && <ProductCreate></ProductCreate>}
        </>
    )

}

export default ProductCRUD
