const gateway = require("fast-gateway");

const server = gateway({
    routes:[{
        prefix:"/user",
        target:"http://localhost:9001"
    },
    {
        prefix:"/admin",
        target:"http://localhost:9002"
    }]

})
server.get("/",(req,res)=>{
    res.send("Main Gateway called")
})
server.start(9000);