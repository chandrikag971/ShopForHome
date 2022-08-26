const gateway = require("fast-gateway");

const server = gateway({
    routes:[{
        prefix:"/products",
        target:"http://localhost:8081",
    },
    {
        prefix:"/users",
        target:"http://localhost:8082",
    },
    {
        prefix:"/coupons",
        target:"http://localhost:8085",
    }

    ]
})
server.get("/",(req,res)=>{
    res.send("Admin Gateway called")
})
server.start(9002);