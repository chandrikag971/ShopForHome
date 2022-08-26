const express = require("express");
const cors = require('cors')
const connectToMongo = require("./config/db");
const {createUser,findAllUsers, findUserName, updateUser, deleteUser} = require("./controllers/users.controllers");
const { authenticateAdmin } = require("../authentication/middleware/auth");

const app = express();
port = 8082; 
connectToMongo();
app.use(express.json());
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','http://localhost:3000' )
    res.header('Access-Control-Allow-Credentials',true )
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.use(cors())
// routes for CRUD operation for admin
app.get('/read-all',authenticateAdmin,findAllUsers)
app.get('/username/:username',authenticateAdmin,findUserName)
app.post('/create',createUser)
app.put('/update/:username',authenticateAdmin,updateUser)
app.delete('/delete/:username',authenticateAdmin,deleteUser)


// listening the port
app.listen(port,()=>{
    console.log(`Server started on ${port}`)
})

// const express = require("express");
// const swaggerJsDoc=require("swagger-jsdoc");
// const swaggerUI=require("swagger-ui-express");
// const YAML=require("yamljs");
// const swaggerJSDocs = YAML.load('./api/swagger/swagger.yaml');
// const cors = require('cors');
// const connectToMongo = require("./config/db");
// const {createUser,findAllUsers, findUserName, updateUser, deleteUser} = require("./controllers/users.controllers");
// const { authenticateAdmin } =  require("../authentication/middleware/auth");

// const app = express();
// const swaggerOptions={
//     swaggerDefinition: {
//         info: {
//             title: 'user API',
//             version: '0.7.5'
//         }
//     },
//     apis: ['index.js'],
// };

// const swaggerDocs=swaggerJsDoc(swaggerOptions);
// console.log(swaggerJSDocs);

// port = 8082; 
// connectToMongo();
// app.use(cors())
// app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerJSDocs));
// app.use(express.json());
// app.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin','http://localhost:3000' )
//     res.header('Access-Control-Allow-Credentials',true )
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// })
// app.use(cors())

// // routes for CRUD operation for admin
// app.get('/read-all',authenticateAdmin,findAllUsers)
// app.get('/username/:username',authenticateAdmin,findUserName)
// app.post('/create',createUser)
// app.put('/update/:username',authenticateAdmin,updateUser)
// app.delete('/delete/:username',authenticateAdmin,deleteUser)

// /**
//  * @swagger
//  * /read-all:
//  *   post:
//  *     description: Get all
//  *     parameters:
//  *      - name: results
//  *        description: results
//  *        in: data
//  *        required: true
//  *        type: string
//  *     responses:
//  *       201:
//  *         description: Created
//  */
// app.post('/read-all',(req,res)=>{
//     res.status(201).send();
// })

// // listening the port
// app.listen(port,()=>{
//     console.log(`Server started on ${port}`)
// })

