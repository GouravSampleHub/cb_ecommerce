const express = require('express')
const path = require('path')
const uuid = require('uuid')

const productModel = require('../models/ProductModel')

const router = express.Router()

// http://localhost:8989/api/product/search
router.post("/search",(request,response)=>
{
    var data = request.body
    productModel.searchProduct(data,(data)=>{      
        response.json(data)
    })
})


// http://localhost:8989/api/product/changestatus
router.post("/changestatus",(request,response)=>
{
    productModel.changeStatus(request.body,(status)=>{
       response.json({status})
    })
})

// http://localhost:8989/api/product/save
router.post("/save",(request,response)=>
{
    var data = request.body
    // console.log(data)
    var uploadFile = request.files.prod_image
    
    data.prod_image = Buffer.from(uploadFile.data).toString('base64');
    
    productModel.saveProduct(data,(status,product)=>{
        response.json({status:status,product:product})   
    })    
})
// http://localhost:8989/api/product/list
router.get("/list",(request,response)=>
{
    productModel.fetchProduct((data)=>{
        console.log(data)
        response.json(data)
    })
})

module.exports = router