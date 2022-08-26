import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import delIcon from "../../icons/delete.svg";
import editIcon from "../../icons/edit.svg";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast"
import UserContext from '../../context/UserContext/UserContext'

function UserRead() {
    const {token} = useContext(UserContext)
    const [userData, setUserData] = useState([])
    const [currUser, setCurrUser] = useState([])
    const [showModal, setShowModal] = useState(false);

    const getUsersList = () => {
        axios.get(`http://localhost:9000/admin/users/read-all`, {
            headers: { token: token },
        })
        .then((res) => {
            setUserData(()=>res.data);
        })
        .catch((err) => {
            toast("Loading Records...");
        });
    }

    useEffect(() => {
        getUsersList()
    }, [])

    const handleChange = (e) => {
        setCurrUser({ ...currUser, [e.target.id]: e.target.value });
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleHideModal = () => {
        setShowModal(false);
    };

    const convertDateFormat = (d) => {
		d = new Date(d)
        return d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear()
    }

    const deleteUser = (username) => {
        fetch(
          `http://localhost:9000/admin/users/delete/${username}`,
          {
            method: "DELETE",
            headers: { token: token },
          }
        )
        .then((res) => res.json())
        .then((result) => {
            if (result.status === "Success") {
                toast.success("Successfully Deleted User");
                getUsersList();
            } else {
                toast.error(result.message);
            }
        });
    };

    const updateUser = () => {
        handleHideModal();
        const data = {
            email: currUser.email,
            password:currUser.password,
            role: currUser.role,
        };
        fetch(
          `http://localhost:9000/admin/users/update/${currUser.username}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json", token: token },
            body: JSON.stringify(data),
          }
        )
          .then((res) => res.json())
          .then((result) => {
            if (result.status === "Success") {
              toast.success("Successfully Updated User");
              getUsersList();
            } else {
              toast.error(result.message);
            }
          });
    };

    return (
      <div>
        <h3 className="textHeadStyle my-3">Read User</h3>
        <Modal show={showModal} onHide={handleHideModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              Update User
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-1" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={currUser?.username}
                  onChange={handleChange}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-1" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={currUser?.email}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-1" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={currUser?.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-1" controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="text"
                  value={currUser?.role}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleHideModal}>
              Close
            </Button>
            <Button variant="primary" onClick={updateUser}>
              Update Details
            </Button>
          </Modal.Footer>
        </Modal>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Created At</th>
              <th scope="col">Update/Delete</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => {
              return (
                <tr key={user.username}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role==="admin"?<b>{user.role}</b>:<p>{user.role}</p>}</td>
                  <td>{convertDateFormat(user.createdAt)}</td>
                  <td>
                    <img
                      id="delIcon"
                      className="icons mx-1"
                      src={delIcon}
                      alt="Del"
                      onClick={()=>deleteUser(user.username)}
                    />
                    <img
                      id="editIcon"
                      className="icons"
                      src={editIcon}
                      alt="Edit"
                      onClick={()=>{
                        setCurrUser({...user})
                        handleShowModal()
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
}

export default UserRead
