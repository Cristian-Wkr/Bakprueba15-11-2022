const { Router } = require("express");
const cors = require("cors");
const router = Router();
const express = require("express");
const admin = require("firebase-admin");
const credentials = require("../miracle-79cc6-firebase-adminsdk-zl7kf-c0eac195d2.json");

const app = express();
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(credentials),
  });
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = admin.firestore();


app.post("/create", async (req, res) => {
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

app.post("/createSuscrip", async (req, res) => {
  let iduser = req.body.iduser;

  let mesesFeth = req.body.mesespago;

  let now = new Date();

  const SusriptionJson = {
    iduser: req.body.iduser,
  };

  const response = await db.collection("Suscripcion").doc().set(SusriptionJson);

  res.send(response);
});
app.put("/updateSus", async (req, res) => {
  try {
    const id = req.body.iduser;
    let idmes = "6ABlWWmgYj0UlPOM4rpt";
    let meses = req.body.mesespago;

    const userRef = db
      .collection("Suscripcion")
      .doc(idmes)
      .update({
        ...meses,
      });
    res.send(userRef);
  } catch (error) {
    res.send(error);
  }
});

function probararrays(arrayiduser,elementoId) {

  const array = arrayiduser;
  const elemento = elementoId;
  const arraySustotales = [];
   for (var i = 0; i < array.length; i++) {
     if (array[i] === elemento) {
       arraySustotales.push(elemento);
    }
    else{
      console.log("no xiste")
    }
  } console.log(arraySustotales)
}
//probararrays(["gato","perro","gato","gato"],"amen")

app.get("/readSus/all", async (req, res) => {
  try {
   const userRef = await db.collection("Suscripcion");
   const response = await userRef.get();
   //console.log(response)
    let responseArr = [];
    let pruebaarrays=[]
   
    response.forEach((doc) => {
      
      responseArr.push(doc.data());

    });
    for (var i = 0; i < responseArr.length; i++) {
      if (responseArr[i].iduser === 'maria') {
        pruebaarrays.push(responseArr[i]);
     }
   } 
   console.log(pruebaarrays)
    return res.send(responseArr);
  
  } catch (error) {
    res.send(error);
  }
  
  
});
//{marzo},{abril},mayo,febrero,iduser,enero}



app.get("/read/all", async (req, res) => {
  try {
    const userRef = db.collection("Suscripcion");
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

app.get("/read/:id", async (req, res) => {
  try {
    const userRef = db.collection("users").doc(req.params.id);
    const response = await userRef.get();
    res.send(response.data());
  } catch (error) {
    res.send(error);
  }
});

app.post("/update", async (req, res) => {
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

app.delete("/delete/:id", async (req, res) => {
  try {
    const response = db.collection("users").doc(req.para.id).delete();
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

////////////////////////////////////////////Autentiation
app.post("/signup", async (req, res) => {
  console.log("index works");

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

app.use("/login", require("./routes/AuthRoutes.js"));

app.use("/users", require("./routes/UsersRouter.js"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`your port is running on PORT ${PORT}.`);
});
