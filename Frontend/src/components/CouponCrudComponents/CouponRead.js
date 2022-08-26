import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import delIcon from "../../icons/delete.svg";
import editIcon from "../../icons/edit.svg";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import UserContext from '../../context/UserContext/UserContext'
import toast from "react-hot-toast"

function CouponRead() {
    const {token} = useContext(UserContext)
    const [couponData, setCouponData] = useState([])
    const [currCoupon, setCurrCoupon] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const getCoupons = () => {
        axios
        .get(`http://localhost:9000/admin/coupons/read-all`, {
            headers: { token: token },
        })
        .then((res) => {
            setCouponData(() => res.data.message);
        })
        .catch((err) => {
            toast("Loading Coupons...")
        });
    }

    useEffect(() => {
        getCoupons()
    }, [])

    const handleChange = (e) => {
        setCurrCoupon({ ...currCoupon, [e.target.id]: e.target.value });
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleHideModal = () => {
        setShowModal(false);
    };

    const convertDateFormat = (d) => {
		// Return Date in DD-MM-YYYY Format
      	d = new Date(d);
      	return d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
    };

    const deleteCoupon = (code) => {
        fetch(`http://localhost:9000/admin/coupons/delete/${code}`, {
            method: "DELETE",
            headers: { token: token },
        })
        .then((res) => res.json())
        .then((result) => {
            if(result.status === "Success")
            {
                toast.success("Coupon Deleted Successfully")
                getCoupons();
            } else {
                toast.error(result.message)
            }
        });
    };

    const updateCoupon = () => {
        handleHideModal()
        const data = {
            code: currCoupon.code,
            type: currCoupon.type,
            value: currCoupon.value,
            eligibility: currCoupon.eligibility,
            expiryDate: currCoupon.expiryDate,
        };
        fetch(`http://localhost:9000/admin/coupons/update/${currCoupon.orgCode}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", token: token },
            body: JSON.stringify(data),
        })
        .then((res) => res.json())
        .then((result) => {
            if (result.status === "Success") {
              toast.success("Coupon Updated Successfully");
              getCoupons();
            } else {
              toast.error(result.message);
            }  
        });
    };

    return (
      <div>
        <h3 className="textHeadStyle my-3">Coupons</h3>
        <Modal show={showModal} onHide={handleHideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Coupon</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-1" controlId="code">
                <Form.Label>Code</Form.Label>
                <Form.Control
                  type="text"
                  value={currCoupon?.code}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-1" controlId="type">
                <Form.Label>Type(amount / Percent)</Form.Label>
                <Form.Control
                  type="text"
                  value={currCoupon?.type}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-1" controlId="eligibility">
                <Form.Label>
                  Eligibility(Amount Required to Apply the Coupon)
                </Form.Label>
                <Form.Control
                  type="number"
                  value={currCoupon?.eligibility}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-1" controlId="value">
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  type="number"
                  value={currCoupon?.value}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-1" controlId="expiryDate">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control
                  type="date"
                  value={currCoupon?.expiryDate}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleHideModal}>
              Close
            </Button>
            <Button variant="primary" onClick={updateCoupon}>
              Update Coupon
            </Button>
          </Modal.Footer>
        </Modal>
        <div style={{"overflowX":"auto"}}>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Code</th>
                <th scope="col">Type</th>
                <th scope="col">{"Eligibility(Total≥)"}</th>
                <th scope="col">Discount</th>
                <th scope="col">Expiry Date</th>
                <th scope="col">Update/Delete</th>
              </tr>
            </thead>
            <tbody>
              {couponData.map((coupon, index) => {
                return (
                  <tr key={coupon.code}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <b>{coupon.code}</b>
                    </td>
                    <td>{coupon.type}</td>
                    <td>{coupon.eligibility}</td>
                    <td>
                      {coupon.type === "amount" ? (
                        <p>₹{coupon.value}/-</p>
                      ) : (
                        <p>{coupon.value}%</p>
                      )}
                    </td>
                    <td>{convertDateFormat(coupon.expiryDate)}</td>
                    <td>
                      <img
                        id="delIcon"
                        className="icons mx-1"
                        src={delIcon}
                        alt="Del"
                        onClick={() => deleteCoupon(coupon.code)}
                      />
                      <img
                        id="editIcon"
                        className="icons"
                        src={editIcon}
                        alt="Edit"
                        onClick={() => {
                          setCurrCoupon({
                            ...coupon,
                            orgCode: coupon.code,
                          });
                          handleShowModal();
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default CouponRead
