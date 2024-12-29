const express = require("express")
const User = require("../models/user") ;

const router = express.Router() ;

router.get("/" ,async (req,res) =>{
   // return res.json(users)
   const allDBUsers = await User.find({}) ;
    const html = `
        <ul>
          ${allDBUsers.map((users) => `<li>${users.firstName} - ${users.email}</li>`)
          .join("")}
        </ul>
    ` ;
    res.send(html)
})

router
   .route("/:id")
   .get(async (req,res) =>{
    
   /* const id = Number(req.params.id) no async
    const users = users.find((user) => user.id === id)
    return res.json(user)*/

    const user = await User.findById(req.params.id) ;
    if(!user) return res.status(400).json({error : "user not found"}) ;
    return res.json(user) ;
})
   .patch(async (req,res) =>{
    //return res.json({ status : "pending"}) ;
    await User.findByIdAndUpdate(req.params.id , {lastName : "Changed"}) ;
    return res.json({ status : "Success"}) ;
})
   .delete((req,res) =>{
    return res.json({ status : "pending"}) ;
})

router.post('/' , async (req,res) =>{
    console.log('hahaha')
    const body = req.body 
    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender //||
       // !body.job_title
    ) {
        return res.status(400).json({msg : "All fields are req .."})
    }

    //if(!body) console.log(gross)

    const result = await User.create({
        firstName : body.first_name ,
        lastName: body.last_name ,
        email: body.email,
     //   jobTitle: body.job_title,
        gender: body.gender,
    })

    console.log("result",result)
    return res.status(201).json({ msg : "success"})
})

module.exports = router ;