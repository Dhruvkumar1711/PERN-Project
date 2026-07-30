const express = require('express')
const {log} =require('node:console')
require('dotenv').config()
const {initDatabases, initDatabase} = require('./controllers/initDb.js');
const db = require('./models/connection.js')
const app = express()

initDatabase();

app.use(express.urlencoded({extended: false}))
app.use(express.json())

const PORT = process.env.PORT || 3000

app.get('/', (req,res)=>{
    res.status(200).json({
        status: "Success",
        message: "welcome to the User Management"
    })
})

app.get('/users', async(req,res)=>{
    const getUsersQuery =`
        SELECT * FROM users
    `
     try{

        const result = await db.query(getUsersQuery);
        res.status(200).json({
            status: "Success",
            message: "All users Fetched",
            data: result.rows
        })
     }
     catch(error) {
        return res.status(500).json({
            status: "Failed",
            message: "Something Went Wrong",
            error: error.message
        })
     }
})



app.listen(PORT,(err)=>{
   if (err) {
        console.log(err)
    }
    
    console.log(`Successfully Connected to Server at Port: ${PORT}`)
    
})