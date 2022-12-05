const mongooseConnection = require('./DB')
var mongoose = require('mongoose');

class Product
{
    productSchema = mongoose.Schema({
        prod_name: {
            type: String,
            required: true,
            lowercase:true
            },
        prod_price: {
            type: Number,
            required: true
            }     ,
        prod_cate: {
            type: String,
            required: true
            },
        prod_brand: {
            type: String,
            required: true
            },
        prod_image: {
            type: String,
            required: true
            },
        prod_status : Boolean
      });

    changeStatus = (data,callback)=>{
        var model = mongoose.model("product",this.productSchema,"product");
        mongooseConnection(conn=>{
            conn.once('open', function() 
            {
                model.find({_id:data.pid}).updateOne({prod_status:data.status},(err)=>
                {
                    conn.close()
                    if(err)
                        callback(false)
                    else
                        callback(true)    
                })                
            })
        })
    }
    

    saveProduct = (data,callback)=>
    {       
        data.prod_status = true
        var model = mongoose.model("product",this.productSchema,"product");
        mongooseConnection(conn=>{
            conn.once('open', function() 
            {
                var ob = new model(data)
                ob.save(function (err,product) {
                    console.log(product)
                    conn.close()
                    if (err) 
                        callback(false)
                    else    
                        callback(true,product)
                  });
            });
        })
    }

    fetchProduct = (callback)=>
    {       
        var model = mongoose.model("product",this.productSchema,"product");
        mongooseConnection(conn=>{
            conn.once('open', function() 
            {
                var obj = model.find({})
                obj.exec((err,data)=>{
                    conn.close()
                    if(err)
                    {
                        console.log(err)
                        callback([])
                    }
                    else
                        callback(data) 
                });
             })
        })
    }

    searchProduct = (data,callback)=>
    {       
        var model = mongoose.model("product",this.productSchema,"product");
        mongooseConnection(conn=>{
            conn.once('open', function() 
            {
                var obj = model.find({$or:[
                    {prod_cate:{$in:data.category}},
                    {prod_brand:{$in:data.brand}},
                ]})
                obj.exec((err,data)=>{
                    conn.close()
                    if(err)
                    {
                        console.log(err)
                        callback([])
                    }
                    else
                        callback(data) 
                });
             })
        })
    }
}

module.exports = new Product()