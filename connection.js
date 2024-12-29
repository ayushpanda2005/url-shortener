const mongoose = require("mongoose") ;

async function connectMDB(url) {
    return mongoose.connect(url) ;
}

module.exports = {
    connectMDB ,
}
