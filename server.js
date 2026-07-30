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

app.post("/users", async (req, res)=>{
    const { name, registration_no, email, password, age } = req.body;

    const insertUserQuery = `
        INSERT INTO users (name, registration_no, email, password, age)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, name, registration_no, email, age;
    `;

    try {
        const result = await db.query(insertUserQuery, [
            name,
            registration_no,
            email,
            password,
            age
        ]);

        return res.status(201).json({
            status: "Success",
            message: "User created successfully",
            data: result.rows[0]
        });
    }
    catch (error){
        return res.send(500).json({
         status: "failure",
         message: "User Cannot be created",
         error: error
      })
   
    }
})

app.post('/login' , async (req,res)=>{
    const {name,password} = req.body

    const userDetailQuery = `
        SELECT * FROM users
        Where name = $1 And password = $2;
    `
    try{
        const result = await db.query(userDetailQuery, [
            name,
            password
        ])
        res.status(200).json(
            {
                Status : "Success",
                message : "This is a valid user, Fetched successfully",
                data : result.rows[0]
            }
        )
    }
    catch(error){
        return res.status(500).json({
            Status : "Failed",
            message : "Not Valid User",
            error : error.message
        })
    }

})

app.patch('/profile' , async (req,res)=>{
     const { email, password, newEmail, newPassword, newAge } = req.body

      if (!email || !password) {
      return res.status(400).json({
         Status: "Failed",
         message: "Correct Email and Password are required"
      })
   }

   const findUserQuery = `
      SELECT * FROM users
      WHERE email = $1 AND password = $2;
   `

    try {
      const findResult = await db.query(findUserQuery, [email, password])
      const currentUser = findResult.rows[0]

      if (!currentUser) {
         return res.status(404).json({
            Status: "Failed",
            message: "Invalid Email or Password"
         })
      }

        const updatedEmail = newEmail ? newEmail : currentUser.email
        const updatedPassword = newPassword ? newPassword : currentUser.password
        const updatedAge = newAge ? newAge : currentUser.age

        const updateProfileQuery = `
            UPDATE users
            SET email = $1, password = $2, age = $3
            WHERE id = $4
            RETURNING *;
        `

        const result = await db.query(updateProfileQuery, [updatedEmail, updatedPassword, updatedAge, currentUser.id])

            return res.status(200).json({
                status: "Success",
                message: "Profile updated successfully!",
                data: result.rows[0]
            });


    }
    catch (error){
        return res.status(500).json({
         Status: "Failed",
         message: "Profile Not Updated",
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