const express = require('express');
const router = express.Router();
const admin = require("firebase-admin");

const db = admin.firestore();

router.post("/createUser", async (req, res) => {
    try {
      const id = req.body.email;
      const userJson = {
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        
      };
      const response = await db.collection("users").doc(id).set(userJson);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  });

  router.get("/readUser/all", async (req, res) => {
    try {
      const userRef = db.collection("users");
      const response = await userRef.get();
      let responseArr = [];
      response.forEach((doc) => {
        responseArr.push(doc.data());
      });
      res.send(responseArr);
    } catch (error) {
      res.send(error);
    }
  });

  router.get("/readUser/:id", async (req, res) => {
    try {
      const userRef = db.collection("users").doc(req.params.id);
      const response = await userRef.get();
      res.send(response.data());
    } catch (error) {
      res.send(error);
    }
  });

  router.post("/updateUser", async (req, res) => {
    try {
      const id = req.body.id;
      const newFirstName = "hello tarqui";
      const userRef = db.collection("users").doc(id).update({
        firstname: newFirstName,
      });
      res.send(userRef);
    } catch (error) {
      res.send(error);
    }
  });
  router.delete("/deleteUser/:id", async (req, res) => {
    try {
      const response = db.collection("users").doc(req.para.id).delete();
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  });
  module.exports = router;