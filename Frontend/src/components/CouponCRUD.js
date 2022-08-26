import React, { useContext, useState } from 'react'
import UserContext from '../context/UserContext/UserContext'
import CouponCreate from './CouponCrudComponents/CouponCreate'
import CouponRead from './CouponCrudComponents/CouponRead'

function CouponCRUD() {
    const { isLogin, role } = useContext(UserContext)
    const [crudOption, setCrudOption] = useState("read")
    return (
        <>
            {isLogin && role === "admin" &&
                <div className="button-group">
                    <button className="btn btn-primary" onClick={()=>{setCrudOption("create")}} >Create New Coupon</button>
                    <button className="btn btn-primary" onClick={()=>{setCrudOption("read")}} >Show Coupons</button>
                </div>
            }

            {isLogin && role === "admin" && crudOption === "create" && <CouponCreate></CouponCreate>}
            {isLogin && role === "admin" && crudOption === "read" && <CouponRead></CouponRead>}
        </>
    )
}

export default CouponCRUD
