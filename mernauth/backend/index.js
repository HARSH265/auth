const express=require('express');
const {connectDb} =require('./db');
const bodyParser=require('body-parser')
const AuthRouter=require('./routers/AuthRouter')
const productRouter=require('./routers/productRouter')
const cors=require('cors')
const app=express()
require('dotenv').config();

// const PORT=process.env.PORT || 8000

app.use(bodyParser.json())
app.use(cors())

app.use('/auth', AuthRouter)
app.use('/products', productRouter)

connectDb( process.env.DB_URI)
app.listen(PORT, ()=>{
    console.log(`Server is listening on port:${PORT}`);
})