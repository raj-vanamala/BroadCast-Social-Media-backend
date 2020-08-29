var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const MongoDb = require('mongodb');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

router.get('/loadHandles/:handle',async function(req,res){

  try {

    let url = process.env.DB1;
    let client = await MongoDb.connect(url);
    let db = await client.db("users");

    let data = await db.collection("Folks").find().toArray()
  
    let userObject = data.filter(obj=>obj.handle === req.params.handle)

    let userFollowing = userObject[0].Following

    res.json({
      "data" : data,
      "userFollowing" : userFollowing,
      "handle" : req.params.handle
    })
  
  } catch (error) {
    console.log(error);
  }
})

router.get('/loadBuddyList/:handle',async function(req,res){

    try {
  
      let url = process.env.DB1;
      let client = await MongoDb.connect(url);
      let db = await client.db("users");
  
      let data = await db.collection("Folks").find({handle : req.params.handle}).toArray()
  
      res.json({
        "data" : data[0].Following
      })
    
    } catch (error) {
      console.log(error);
    }
})

router.get('/loadBuddyListCount/:handle',async function(req,res){

  try {

    let url = process.env.DB1;
    let client = await MongoDb.connect(url);
    let db = await client.db("users");

    let data = await db.collection("Folks").find({handle : req.params.handle}).toArray()
    
    res.json({
      "data" : data[0].Following.length
    })
  
  } catch (error) {
    console.log(error);
  }
})

router.get('/loadFollowers/:handle',async function(req,res){

    try {
  
      let url = process.env.DB1;
      let client = await MongoDb.connect(url);
      let db = await client.db("users");
  
      let data = await db.collection("Folks").find({handle : req.params.handle}).toArray()
  
      console.log(data[0].Followers)
      res.json({
        "data" : data[0].Followers
      })
    
    } catch (error) {
      console.log(error);
    }
})

router.post('/addHandleToBuddyList',async function(req,res){

    try {

      let url = process.env.DB1;
      let client = await MongoDb.connect(url);
      let db = await client.db("users");

      let data = await db.collection("Folks").update(
      {
        "handle" : req.body.userHandle
      },
      {
        $push : { Following :
          
          req.body.handle
          
        }
      }
      )


      res.json({
        "message" : "Handle  Added Successfully To Your Buddy List"
      })
    
    } catch (error) {
      console.log(error);
    }
})

router.delete('/UnFollowHandle/:userHandle/:handle',async function(req,res){

  try {

    let url = process.env.DB1;
    let client = await MongoDb.connect(url);
    let db = await client.db("users");

    let data = await db.collection("Folks").updateOne(
    {
      "handle" : req.params.userHandle
    },
    {
      $pull : { Following :
        
        req.params.handle
        
      }
    }
    )

    res.json({
      "message" : "Handle  UnFollowed"
    })
  
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
