require('dotenv').config()
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const bodyParser = require('body-parser')
const massive = require('massive')
const controller = require('./controller')
const session = require ('express-session')
const app = express()

app.use( express.static( `${__dirname}/../build` ));
app.use(bodyParser.json())
app.use(cors())
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
    })
)

massive(process.env.CONNECTION_STRING).then ( 
(db) => {
    app.set('db', db)

}).catch(err => console.error(err))


app.post('/phone_database', controller.add )
app.post('/twilio', controller.send )
app.get('/get' , controller.get)
app.post('/post_database', controller.createPost)
app.get('/getforum' , controller.getForum)
app.delete('/deletepost/:id' , controller.deletePost)
app.put('/updatepost/:id' , controller.updatePost)
app.get('/getjoin' , controller.getJoin)
app.put('/logout' , controller.logout)
app.get('/getforuminfo/:id', controller.getInfo)
app.post('/reply', controller.reply)
app.get('/getreplies' , controller.getreplies)
app.delete('/deletereply/:id', controller.deleteReply)
app.post('/messages' , controller.sendMessage)




app.post('/login', (req, res) => {
    const { userId } = req.body
    const auth0Url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${userId}`
    axios.get(auth0Url, {
        headers: {
            Authorization: 'Bearer ' + process.env.AUTH0_ACCESS_TOKEN
        }
    }).then(response => {
        const userData = response.data
        req.session.user = { 
            name: userData.name, 
            email: userData.email, 
            auth0_id:userData.user_id,
            pictureUrl: userData.picture 
           }
        res.json({ user: req.session.user })
        app.get('db').find_user(userData.user_id).then(users => {
            if (!users.length) {
               app.get('db').create_user([userData.user_id, userData.email, userData.picture, userData.name]).then(()=> {
   
               }).catch(error => {
                   console.log('error', error)
               })
            }
        })
    }).catch(error => {
        console.log('eror',error)
        res.status(500).json({message:'problemo'})
    })
   })
   
   app.get('/user-data', (req,res) =>{
       res.json({ user: req.session.user })
   })
   
   
   const path = require('path')
   app.get('*', (req, res)=>{
     res.sendFile(path.join(__dirname, '../build/index.html'));
   })



   const PORT = process.env.SERVER_PORT
   app.listen(PORT, () =>{
       console.log(`I'm listening to you on Port: ${PORT} ("\\(*-*)/")`)
   })
   