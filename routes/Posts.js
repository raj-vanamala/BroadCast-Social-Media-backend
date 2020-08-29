var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const MongoDb = require('mongodb');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

router.post('/createPost',async function(req,res){

    try {

      let url = process.env.DB1;
      let client = await MongoDb.connect(url);
      let db = await client.db("users");

      let data = await db.collection("Posts").update(
      {
        "handle" : req.body.handle
      },
      {
        $push : { posts :
          
          // postId : postCount,
          {
          "handle" : req.body.handle,
          postContent : req.body.postContent,
        }
        }     
      }
      )

      let data1 = await db.collection("AllUserPosts").insertOne(
        {
          "handle" : req.body.handle,
          "postContent" : req.body.postContent
        }
        )

      res.json({
        "message" : "Post Created Successfully"
      })
    
    } catch (error) {
      console.log(error);
    }
})

router.get('/loadPosts/:handle',async function(req,res){

  try {

    let url = process.env.DB1;
    let client = await MongoDb.connect(url);
    let db = await client.db("users");

    let data = await db.collection("Posts").find({handle : req.params.handle} , {posts : 1}).toArray()

    res.json({
      "data" : data
    })
  
  } catch (error) {
    console.log(error); 
  }
})

router.get('/loadBuddyPosts/:handle',async function(req,res){

  try {

    let url = process.env.DB1;
    let client = await MongoDb.connect(url);
    let db = await client.db("users");

    let data = await db.collection("AllUserPosts").find({handle : req.params.handle}).toArray()

    res.json({
      "data" : data
    })
  
  } catch (error) {
    console.log(error); 
  }
})

router.get('/loadPostsCount/:handle',async function(req,res){

  try {

    let url = process.env.DB1;
    let client = await MongoDb.connect(url);
    let db = await client.db("users");

    let data = await db.collection("Posts").find({handle : req.params.handle} , {posts : 1}).toArray()

    res.json({
      "data" : data
    })
  
  } catch (error) {
    console.log(error); 
  }
})

module.exports = router;
