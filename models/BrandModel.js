const mongooseConnection = require('./DB')
var mongoose = require('mongoose');

class Brand
{
    brandSchema = mongoose.Schema({        
        brand_name: {
            type: String,
            required: true,
            lowercase:true,
            unique: true,
            }       
    });
    

    saveBrand = (data,callback)=>
    {       
        var model = mongoose.model("brand",this.brandSchema,"brand");
        mongooseConnection(conn=>{
            conn.once('open', function() 
            {
                var ob = new model(data)
                ob.save(function (err,brand) {
                    console.log(brand)
                    conn.close()
                    if (err) 
                        callback(false)
                    else    
                        callback(true,brand)
                  });
            });
        })
    }

    fetchBrand = (callback)=>
    {       
        var model = mongoose.model("brand",this.brandSchema,"brand");
        mongooseConnection(conn=>{
            conn.once('open', function() 
            {
                var obj = model.find({})
                obj.exec((err,data)=>{
                    conn.close()
                    if(err)
                        callback([])
                    else
                        callback(data) 
                });
             })
        })
    }
}

module.exports = new Brand()