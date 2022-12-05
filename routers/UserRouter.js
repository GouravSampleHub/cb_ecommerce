const express = require('express')
const userModel = require('../models/UserModel')
const jwt = require('../JWT')
const bcrypt = require('bcrypt');
const cors = require('cors')
const saltRounds = 10;

const stripe = require("stripe")("sk_test_51H47bhGn0V8TkBtWMntS8EPc6f56rRtIjwqH3deH11VoqwzvhqfGlbMF5EZFBdyvT8Q8vkYQUzpdCv2HE7vSmuuB00H4H1kV3H");

const router = express.Router()

// http://localhost:8989/user/purchase
router.post("/purchase",cors(),async(req, res) => 
{
  let { amount, payment_method_id } = req.body;
  try 
  {
      const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "INR",
      description: "Your Company Description",
      payment_method: payment_method_id,
      confirm: true,
    });
    res.json({
      message: "Payment Successful",
      success: true,
    });
  } catch (error) {
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
});


// http://localhost:8989/user/adminlogin
router.post("/adminlogin",(request,response)=>
{
  if(request.body.adminid=='admin@gmail.com' && request.body.password=='12345')
  {
    response.json({status:true,msg:"Login Success"})
  }else{
    response.json({status:false,msg:"Login Failed"})
  }
})

// http://localhost:8989/user/updateProfile
router.post("/updateProfile",(request,response)=>
{
  jwt.authenticateToken(request,(data)=>{    
    if(data.status)
    {
      // Update the data
    }else{
      response.json({status:false,code:data.code})
    }
  })
})

// http://localhost:8989/user/updatePassword
router.post("/updatePassword",(request,response)=>
{
  jwt.authenticateToken(request,(data)=>{    
    if(data.status)
    {
      // Update the Password
    }else{
      response.json({status:false,code:data.code})
    }
  })
})

// http://localhost:8989/user/getUser
router.post("/getUser",(request,response)=>
{
   jwt.authenticateToken(request,(data)=>{    
     if(data.status)
     {
        userModel.getUser(request.user,(userdata)=>
        {
          var token = jwt.generateAccessToken(request.user)
          response.json({status:true,user:userdata,token:token})
        })
     }else{
       response.json({status:false,code:data.code})
     }
   });
})

// http://localhost:8989/user/register
router.post("/login",(request,response)=>
{
  console.log(request.body)
  userModel.loginUser(request.body.email,(data)=>{
      if(data==null){
          response.json({status:false,msg:"Invalid Email ID !"})
      }else{
        bcrypt.compare(request.body.password, data.password).then(function(result) {
            if(result)
            {
                var token = jwt.generateAccessToken(data._id)
                response.json({status:true,msg:"Success !",token:token,username:data.name})                
            }else{
                response.json({status:false,msg:"Invalid Password !"})
            }
        });
      }
  })
})
// http://localhost:8989/user/register
router.post("/register",(request,response)=>
{
  console.log(request.body)
  bcrypt.genSalt(saltRounds, function(err, salt) 
  {
    bcrypt.hash(request.body.password, salt, function(err, hash) 
    {        
          request.body.password = hash
          userModel.saveUser(request.body,(status,user)=>{
                if(status)
                    response.json({status:true,msg:"Registeration Success !"})
                else
                    response.json({status:false,msg:"Registeration Failed !"})                
        })
    });
  });
})

module.exports = router
