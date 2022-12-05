var mongoose = require('mongoose');

function getConnection(callback)
{
    mongoose.connect('mongodb+srv://root:root@cluster0.5hmpk.mongodb.net/ecommercedb?retryWrites=true&w=majority');
    var conn = mongoose.connection;
    callback(conn)
}

module.exports = getConnection