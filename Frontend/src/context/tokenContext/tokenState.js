import { useState } from "react";
import TokenContext from "./tokenContext";

const TokenState=(props)=>{
    const [loginToken,setLoginToken]=useState('')
    const exportObj = {loginToken,setLoginToken}
    return(
        <TokenContext.Provider value={exportObj}>
            {
                props.children
            }
        </TokenContext.Provider>
    )
}

export default TokenState;
