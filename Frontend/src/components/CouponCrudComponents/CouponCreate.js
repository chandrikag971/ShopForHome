import React, { useContext, useState } from 'react'
import UserContext from '../../context/UserContext/UserContext'
import toast from "react-hot-toast"

function CouponCreate() {
    const {token} = useContext(UserContext)
    const [coupon, setCoupon] = useState({
      code: "",
      type: "",
      value: "",
      eligibility: 0,
      expiryDate: new Date(),
    });

    const handleChange = (e) => {
        setCoupon({...coupon,[e.target.name]:e.target.value})
    }
    
    const createCoupon = () => {
        fetch(`http://localhost:9000/admin/coupons/add`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                "token": token
            },
            body: JSON.stringify(coupon)
        })
        .then(res => res.json())
        .then(result => {
            if (result.status === "Success") {
                toast.success("Coupon Created Successfully");
                setCoupon(()=>{
                    return {
                        code: "",
                        value: "",
                        type: "",
                        eligibility: 0,
                        expiryDate: new Date()
                    }
                })
            } else {
                toast.error(result.message);
            }
        })
        .catch(err=>{
            toast.error("Please Check the Details are Filled");
        })
    }

    return (
        <div>
            <div className="container">
                <h3 className="textHeadStyle">Create New Coupon </h3>
                <form>
                    <div className="form-floating mb-3">
                        <input name="code" type="text" className="form-control" title='newUser30' placeholder="abcd15" onChange={handleChange} value={coupon.code} />
                        <label htmlFor="floatingInput">Code</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input name="type" type="text" className="form-control" title='amount/percent' placeholder="amount" onChange={handleChange} value={coupon.type} />
                        <label htmlFor="floatingInput">Type(amount/percent)</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input name="value" type="number" className="form-control" title='0-100%' placeholder="0-100" onChange={handleChange} value={coupon.value} />
                        <label htmlFor="floatingInput">Discount</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input name="eligibility" type="number" className="form-control" title='amount' placeholder="any amount" onChange={handleChange} value={coupon.eligibility} />
                        <label htmlFor="floatingInput">Eligibility</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input name="expiryDate" type="date" className="form-control" title='date' placeholder="26-07-2022" onChange={handleChange} value={coupon.expiryDate} />
                        <label htmlFor="floatingInput">Expiry Date</label>
                    </div>
                    <button type="button" className="btn btn-primary btn-lg space bg-btn" onClick={createCoupon}>Create</button>
                </form>
            </div>
        </div>
    )
}

export default CouponCreate
