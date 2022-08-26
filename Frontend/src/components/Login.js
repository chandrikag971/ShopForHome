import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext/UserContext';
import toast from "react-hot-toast"
import "./CSS/Login.css"

function Login() {
    const userData = useContext(UserContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const loginUser = () => {
        const loginData = {
            email: email,
            password: password
        }
        fetch(`http://localhost:9000/user/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: "include",
            withCredentials: true,
            body: JSON.stringify(loginData)
        })
        .then(res => res.json())
        .then(result => {
            if (result.status==='Success') {
                userData.setUser(result.data)
                localStorage.setItem("userData", JSON.stringify(result))
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        })
        .catch(err=>{
            toast.error(err)
        })
    }



    return (
      <>
        <div className="container page-ht">
            <h1 className="textHeadStyle">Login</h1>
            <form>
                <div className="form-floating mb-3">
                <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={handleEmailChange}
                    value={email}
                />
                <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={handlePasswordChange}
                    value={password}
                />
                <label htmlFor="floatingPassword">Password</label>
                </div>
                <NavLink to={"/"}>
                <button
                    type="button"
                    className="btn btn-primary btn-lg space bg-btn"
                    onClick={loginUser}
                >
                    Login
                </button>
                </NavLink>
            </form>
        </div>
      </>
    );
}

export default Login
