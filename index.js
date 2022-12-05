const express = require('express')
const path = require('path')
const cors = require('cors')
const fs = require('fs')
const upload = require('express-fileupload')

const categoryRouter = require('./routers/CategoryRouter')
const brandRouter = require('./routers/BrandRouter')
const productRouter = require('./routers/ProductRouter')
const userRouter = require('./routers/UserRouter')
const { response } = require('express')
const app = express()

app.use(express.static(path.join("./pimages")))
app.use(cors()) // Accepting Request from anywhere
app.use(express.json()) // for receiving JSON data
app.use(upload())



app.use("/api/category",categoryRouter)
app.use("/api/brand",brandRouter)
app.use("/api/product",productRouter)
app.use("/user",userRouter)


app.get("/",(request,response)=>{
	response.send("Server Running ...... ")
})




const PORT = process.env.PORT || 3000;
app.listen(PORT, err => {
    if(err) throw err;
    console.log("%c Server running", "color: green");
});
