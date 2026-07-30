const express = require('express')

const app = express()

const PORT = process.env.PORT || 3000

app.get('/', (req,res)=>{
    res.status(200).json({
        status: "Success",
        message: "welcome to the User Management"
    })
})

app.listen(PORT,(err)=>{
   if (err) {
        console.log(err)
    }
    
    console.log(`Successfully Connected to Server at Port: ${PORT}`)
    
})