const mongooseConnection = require('./DB')
var mongoose = require('mongoose');

class User
{
    userSchema = mongoose.Schema({        
        name: {
            type: String,
            required: true,
            lowercase:true
            },
        phone: {
            type: String,
            unique: true,
            required: true
            },
        email: {
            type: String,
            unique: true,
            required: true
            },
        password: {
            type: String,
            required: true
            },
        address : Array,
        otp : Number,
        isverify : Boolean
    });

    getUser = (userid,callback)=>
    {
        var model = mongoose.model("user",this.userSchema,"user");
        mongooseConnection(conn=>{
            conn.once('open', function() 
            {
                var obj = model.findOne({_id:userid})
                obj.exec((err,data)=>{
                    conn.close()
                    if(err)
                        callback(false)
                    else
                        callback(data) 
                });
             })
        })
    }
    
    loginUser = (email,callback)=>
    {
        var model = mongoose.model("user",this.userSchema,"user");
        mongooseConnection(conn=>{
            conn.once('open', function() 
            {
                var obj = model.findOne({email:email})
                obj.exec((err,data)=>{
                    conn.close()
                    if(err)
                        callback(false)
                    else
                        callback(data) 
                });
             })
        })
    }

    saveUser = (data,callback)=>
    {       
        var model = mongoose.model("user",this.userSchema,"user");
        mongooseConnection(conn=>{
            conn.once('open', function() 
            {
                var ob = new model(data)
                ob.save(function (err,user) {
                    console.log(user)
                    conn.close()
                    if (err) 
                        callback(false)
                    else    
                        callback(true,user)
                  });
            });
        })
   }
}

module.exports = new User()