import React, { useContext, useState } from 'react'
import UserContext from '../context/UserContext/UserContext'
import UserCreate from './UserCrudComponents/UserCreate'
import UserRead from './UserCrudComponents/UserRead'
import "./CSS/buttons.css"


function UserCRUD() {

    const { isLogin, role } = useContext(UserContext)
    const [crudOption, setCrudOption] = useState("read")

    return (
        <>
            {isLogin && role === "admin" &&
                <div className="button-group"> 
                    <button className="btn btn-primary" onClick={()=>{setCrudOption("create")}} >Create New Account</button>
                    <button className="btn btn-primary" onClick={()=>{setCrudOption("read")}} >Show Accounts</button>
                </div>
            }

            {isLogin && role === "admin" && crudOption === "create" && <UserCreate></UserCreate>}
            {isLogin && role === "admin" && crudOption === "read" && <UserRead></UserRead>}
        </>
    )
}

export default UserCRUD
