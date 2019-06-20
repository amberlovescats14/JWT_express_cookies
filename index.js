const express = require('express')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const users = require('./users.json')
const cors = require('cors')



const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  // origin: 'http://localhost:3001',
  //or live reload
  //origin has to do with cors
  origin: 'http://127.0.0.1:5500',
  credentials: true
}))
const SECRET = "amber"

app.post('/auth/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  if(email !== "ambie.j210@gmail.com" ||
  password !== "123456"){
    res.status(400).json({msg: `Not Valid`})
    throw new Error(`Not Valid`)
  } else {
    const payload = {
      email
    }
    const token = jwt.sign(payload, SECRET)

    res.cookie('access_token', token, {
      //cookie options
      maxAge: 3600,
      httpOnly: true,
      // secure: true
    })
    return res.status(200).json({msg: `ok got it`})
  }
})

app.use('/api/users', (req, res) => {
  const token = req.cookies.access_token
  try {
    const decoded = jwt.verify(token, SECRET)
    
  } catch (error) {
    res.status(400)
    throw error
  }
  return res.status(200).json(users)
})

app.use((err, req, res, next)=> {
  res.json(err)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log(`Listening on port: ${PORT}`))