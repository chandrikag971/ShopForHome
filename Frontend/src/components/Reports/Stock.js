import React, { useContext, useEffect, useState } from 'react'
import delIcon from "../../icons/delete.svg"
import editIcon from "../../icons/edit.svg"
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast"
import UserContext from '../../context/UserContext/UserContext'

function Stock() {
    const [productList, setProductList] = useState([])
    const [currProduct,setCurrProduct] = useState();
    const [showModal, setShowModal] = useState(false);
    const {token} = useContext(UserContext)

    const getProductsList = () => {
        fetch(`http://localhost:9000/admin/products/read-all`, {
          headers: { token: token },
        })
        .then((res) => res.json())
        .then((result) => {
          setProductList(()=>result);
        }).catch(err=>{
          toast("Loading Records...")
        })
    }

    useEffect(() => {
        getProductsList();
    }, [])

    const handleChange = (e) => {
        setCurrProduct({...currProduct,
            [e.target.id]:e.target.value
        })
    }

    const handleShowModal = () => {
      setShowModal(true);
    };

    const handleHideModal = () => {
      setShowModal(false);
    };

    const deleteProduct = (id) => {
        fetch(`http://localhost:9000/admin/products/delete/${id}`,{method:'DELETE', headers:{"token": token}}).then(res=>res.json()).then(result=>{
            toast.success("Item Deleted Succesfully")
            getProductsList();
        }).catch(_e=>{
            toast.error("Internal Server Error")
        })
    }

    const updateProduct = () => {
        handleHideModal()
        const data = {
          productName: currProduct.productName.toLowerCase(),
          companyName: currProduct.companyName.toLowerCase(),
          price: currProduct.price,
          tags: currProduct.tags.toString().toLowerCase().replace(/, /g, ",").split(","),
          stock: currProduct.stock,
          mail:(currProduct.stock<10)?"Need To Mail":"Available"
        };
        fetch(`http://localhost:9000/admin/products/update/${currProduct._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', "token": token }, body: JSON.stringify(data) }).then(res => res.json()).then(result => {
            toast.success("Successfully Updated")
            getProductsList();
        }).catch(err=>{
            toast.error("Updation Failed")
        })
    }


    return (
      <div>
        <h3 className="textHeadStyle my-3">Products List</h3>
        <Modal show={showModal} onHide={handleHideModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              Update Product
              <br />
              <p
                className="text-muted"
                style={{ fontSize: "15px", marginBottom: "0" }}
              >
                ProductID - {currProduct?._id}
              </p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="productName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  value={currProduct?.productName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="companyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  value={currProduct?.companyName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  value={currProduct?.price}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="tags">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  value={currProduct?.tags}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="stock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="text"
                  value={currProduct?.stock}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleHideModal}>
              Close
            </Button>
            <Button variant="primary" onClick={updateProduct}>
              Update Details
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="table-responsive">
          <table className="table table-hover table-striped my3">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product Name</th>
                <th scope="col">Company Name</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col">Status</th>
                <th scope="col">Update/Delete</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product,index) => {
                return (
                  <tr key={product._id}>
                    <td><b>{index+1}</b></td>
                    <td>{product.productName}</td>
                    <td>{product.companyName}</td>
                    <td style={{ fontWeight: "bold" }}>₹{product.price}/-</td>
                    <td style={{ fontWeight: "bold" }}>{product.stock}</td>
                    <td>
                      {product.mail === "Mailed" ? (
                        <b>{product.mail}</b>
                      ) : (
                        <p>{product.mail}</p>
                      )}
                    </td>
                    <td>
                      <img
                        id="delIcon"
                        className="icons"
                        src={delIcon}
                        alt="Del"
                        onClick={() => deleteProduct(product._id)}
                      />
                      &nbsp;
                      <img
                        id="editIcon"
                        className="icons"
                        src={editIcon}
                        alt="Edit"
                        onClick={() => {
                          setCurrProduct(product);
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

export default Stock;
