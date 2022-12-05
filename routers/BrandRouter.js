const express = require('express')
const brandModel = require("../models/BrandModel")
const router = express.Router()

// http://localhost:8989/api/brand/list
router.get("/list",(request,response)=>
{
    brandModel.fetchBrand((data)=>response.json(data))
})
// http://localhost:8989/api/brand/save
router.post("/save",(request,response)=>
{    
    brandModel.saveBrand(request.body,(status,data)=>{
            response.json({status:status,brand:data})
    });
})

module.exports = router