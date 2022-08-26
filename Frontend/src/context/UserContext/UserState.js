import { useState } from "react";
import UserContext from "./UserContext";

const UserState = (props) => {
    const [username, setUseraname] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState(0)
    const [token, setToken] = useState("")
    const [role, setRole] = useState("")
    const [isLogin, setIsLogin] = useState(false)

    const setUser = (data) => {
        setUseraname(data.username);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
        setPhone(data.phone);
        setToken(data.token);
        setRole(data.role);
        setIsLogin(data.loginStatus)

        console.log(username, role, token)
    }
    const exportObject = {
        username,
        firstName,
        lastName,
        email,
        phone,
        token,
        role, isLogin, setUser, setIsLogin
    }
    return (
        <UserContext.Provider value={exportObject}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;