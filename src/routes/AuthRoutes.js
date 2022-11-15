const express = require('express');
const router = express.Router();

router.post("/", async (req, res) => {
    
    res.send(req.body);
  });

 

router.post("/auth", async (req, res) => {
    
    res.send(req.body);
  });

   


router.post("/signup", async (req, res) => {
    console.log("ya esta pe");

    const user = {
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    };
    const userResponse = await admin.auth().createUser({
      email: user.email,
      password: user.password,
      emailVerified: false,
      disabled: false,
    });
  
    const userid = userResponse.uid;
    const response = await db.collection("users").doc(userid).set(user);
    res.send(response.id);
  });


  module.exports = router;