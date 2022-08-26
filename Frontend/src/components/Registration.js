import React, { useState } from 'react'
import toast from "react-hot-toast"

function Registration() {
    const [user, setUser] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
      createdAt: new Date()
    });

    const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };

    const registerUser = () => {
        fetch(`http://localhost:9000/user/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
        .then((res) => res.json())
        .then((result) => {
        if (result.status === "Success")
            toast.success("Successfully Created User");
        else 
            toast.error(result.message);
        })
        .catch((err) => {
            toast.error(err);
        });

        setUser({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "user",
          createdAt: new Date(),
        });
    }

    return (
        <div className="container">
            <h1 className="textHeadStyle my-3">Register as a user </h1>
            <form>
                <div className="form-floating mb-3">
                    <input name="username" type="text" className="form-control" placeholder="name@example.com" onChange={handleChange} value={user.username} />
                    <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input name="email" type="email" className="form-control" placeholder="name@example.com" onChange={handleChange} value={user.email} />
                    <label htmlFor="floatingInput">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input name="password" type="password" className="form-control" placeholder="Password" onChange={handleChange} value={user.password} />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-floating mb-3">
                    <input name="confirmPassword" type="password" className="form-control" placeholder="Password" onChange={handleChange} value={user.confirmPassword} />
                    <label htmlFor="floatingPassword">Confirm Password</label>
                </div>
                <button type="button" className="btn btn-primary btn-lg space bg-btn" onClick={registerUser}>Register</button>
            </form>
        </div>
    )
}

export default Registration
