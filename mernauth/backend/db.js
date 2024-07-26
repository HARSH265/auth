const mongoose =require('mongoose');

const connectDb = (url)=>{
    mongoose.connect(url)
    console.log('connect to mongodb');
}
module.exports ={connectDb} 