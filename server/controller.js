const axios = require('axios')
const twilio = require('twilio')
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.TWILLIO_TOKEN

const client = new twilio(accountSid, authToken)

const numbers=['4807847908','2064469482']

const numbers2=[]
module.exports = {


    add(req,res){
        const db = req.app.get('db')
        const { number } = req.body

        db.create_phone([number])
        .then(() => res.status(200).send())
        .then(() => {
            db.find_phone(number).then(() => {
            numbers2.push(number)
        }).then(() => {
        console.log(numbers2)
        }).catch(() => res.status(500).send())
        })
    },

    
    send(){
        (numbers2.forEach(function(value, index){console.log(value)
            setTimeout(function(){
                client.messages.create({
                    body:'test message',
                    to: value,
                    from:'4802646545'
                })
            }, index * 5000)
        })
    )},


    get(req,res){
        const db = req.app.get('db')
        const {number} = req.body
        const number5=[]
        db.find_phone(number).then((res) => {
            number5.push(number)
        }).then(() => {
        res.send(number5)
    })
    },

    createPost(req, res) {
        const db = req.app.get('db')
        const { auth0_id, title, content } = req.body

        db.create_post([auth0_id, title, content])
        .then(() => res.status(200).send())
        .catch(() => res.status(500).send())
    },

    getForum(req,res) {
        const db = req.app.get('db')

        db.find_post().then((create_post) => {
            res.send(create_post)
        })
        .then(() => res.status(200).send())
        .catch(() => res.status(500).send())
    },

    deletePost(req,res) {
        const { params } = req
        const db = req.app.get('db')

        db.delete_post([params.id]).then ((create_post) => {
            res.status(200).send(create_post)
        })
        .catch(() => res.status(500).send())
    },
 
    updatePost(req, res) {
        const { params, body } = req
        const db = req.app.get('db')
        
        db.update_post([params.id, body.newtitle, body.newcontent]).then((create_post) => {
            res.status(200).send(create_post)
        }).catch(() => res.status(500).send())
    },

    getJoin(req, res) {
        const db = req.app.get('db')
        
        db.join_id().then((create_post) => {
            res.send(create_post)
        })
        .then(() => res.status(200).send())
        .catch(() => res.status(500).send())

    },

    logout(req, res) {
        req.session.destroy()
    },

    getInfo(req,res) {
        const db = req.app.get('db')
        const { id } = req.body
        db.find_info(id).then((create_post) => {
            res.send(create_post)
        })
        .then(() => res.status(200).send())  
    }
    }