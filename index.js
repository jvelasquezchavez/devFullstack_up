const express = require("express");
const app = express();
const http = require("http").createServer(app);
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const PORT = process.env.PORT;
const URL = process.env.MONGO_URL;
const users = require("./endpoints/users");
const characters = require("./endpoints/character");
const authorization = require("./endpoints/auth");

mongoose
  .connect(URL)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use("/endp", users, characters, authorization);

app.get("/", (req, res) => {
  res.status(200).json("Hola estoy funcionando.");
});

http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});

// GET - POST - DELETE - PUT - PATCH 

// app.post("/",(req,res) => {
//     res.send("Llamada post");
// });

// // Get de todos los usuarios
// app.get("/users",Middleware.verify,async (req,res) =>{

//   let limit = req.query.limit;
//   let offset = req.query.offset;

//   try{
//       const results = await UsrController.getAllUsers(limit,offset);
//       res.status(200).json(results);

//   }catch(error){
//       res.status(500).send("Error. Intente más tarde.")
//   }

// });

// // Get Info de un usuario

// app.get("/users/:id",async (req,res) =>{

//     let userId =  req.params.id;

//     try{

//       user = await UsrController.getUser(userId);

//       res.status(200).json(user);

//     }catch(error){
//       res.status(500).send("Error");
//     }

// });

// // Creo un nuevo usuario

// app.post("/users",async (req,res) =>{
    
//     let name = req.body.name;
//     let lastname = req.body.lastname;
//     let email = req.body.email;
//     let isActive = req.body.isActive;
//     let password = req.body.password;
//     try{
//       const result = await UsrController.addUser(name,lastname,email,isActive,password);
//       if(result){
//         res.status(201).send("Usuario creado correctamente"); // 201
//       }else{
//         res.status(409).send("El usuario ya existe"); // 409
//       }  
//     }catch(error){
//       res.status(500).send("Error al crear el usuario."); //500
//     }  
    
// });

// // Modifico un usuario
// app.put("/users/:id",async (req,res) =>{

//     const user = { _id: req.params.id, ...req.body };
//     //             {_id: req.params.id, name: req.body.name, lastname, email }
//     try{
      
//       const result = await UsrController.editUser(user);
//       if(result){
//         res.status(200).json(result);
//       }else{
//         res.status(404).send("El usuario no existe.");
//       }  
//     }catch(error){  
//        res.status(500).send("Error");
//     } 

// });

// // Elimino un usuario
// app.delete("/users/:id", async(req,res) =>{

//     try{

//       const result = await UsrController.deleteUser(req.params.id);
//       if(result){
//         res.status(200).send("Usuario borrado.")
//       }else{
//         res.status(404).send("No se ha podido eliminar el usuario.")
//       }  

//     }catch(error){
//       res.status(500).send("Error")
//     }
// });

// app.put("/users/:id/roles",async (req,res) =>{
    
//     const roles = req.body.roles;
//     //const user = { _id: req.params.id, ...req.body };
//     try{
      
//       const result = await UsrController.editRoles(roles,req.params.id);
//       if(result){
//         res.status(200).json(result);
//       }else{
//         res.status(404).send("El usuario no existe.");
//       }  
//     }catch(error){  
//        res.status(500).send("Error");
//     } 
// })

// app.post("/auth/login", async (req,res) => {

//     const email = req.body.email;
//     const password = req.body.password;
//     try{
//       const result = await AuthController.login(email,password);
//       if(result){
//         res.status(200).json(result);
//       }else{
//         res.status(401).send("No puede estar aqui")
//       }
//     }catch(error){
//         res.status(500).send("Error");
//     }  
// })

/* Manda un mail */
//MailController.sendMail();