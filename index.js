const express = require("express")
const app = express();
const http = require ("http").createServer(app);
const dotenv = require('dotenv').config(); 
const PORT = process.env.PORT;

// Acceso a la DB

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DB_URL;
 const client = new MongoClient(uri, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });

app.use(express.json());

http.listen(PORT,() =>{
    console.log(`listening to ${PORT}`);
})

app.get("/personajes", async (req,res) =>{

    //let result = {'personaje':1,'personaje':2,'personaje':3} 
    
    let { limit = 5, offset = 0 } = req.params;
    console.log(limit);
    try{
        let result = await collection.find({}).skip(parseInt(offset)).limit(parseInt(limit)).toArray()
        console.log(result);
        res.json({burgers: result});
    }catch(error){
        console.log("error");
        let response = {'status':500,'message':"Error de conexión."}
        res.json({response: response});
    }    
})

app.post("/login", (req, res) => {
    const { nombre, pin } = req.body;
  
    // Aquí debes verificar el nombre y el PIN en tu base de datos o sistema de autenticación.
    // Si la autenticación es exitosa, puedes guardar el nombre del niño en la sesión o en una cookie.
    // Luego redireccionar al usuario a la página de selección de personajes o a donde corresponda.
  
    // Si la autenticación falla, puedes devolver un mensaje de error.
  });

  app.get("/personajes/disponibles", (req, res) => {
    // Aquí debes obtener la lista de personajes disponibles desde tu base de datos.
    // Luego, devolverla como respuesta en formato JSON.
  });
  
  app.post("/atuendo", (req, res) => {
    const { parteSuperior, parteInferior, zapatos } = req.body;
  
    // Aquí debes guardar el atuendo seleccionado por el niño en tu base de datos o sistema de almacenamiento.
  
    // Luego, puedes devolver un mensaje de éxito o error como respuesta.
  });

  app.post("/guardarResultado", (req, res) => {
    const { resultado } = req.body;
  
    // Aquí debes guardar el resultado en tu base de datos o sistema de almacenamiento.
  
    // Luego, puedes devolver un mensaje de éxito o error como respuesta.
  });


  app.get("/personajes/generados", (req, res) => {
    // Aquí debes obtener los personajes generados previamente por el niño desde tu base de datos.
    // Luego, devolverlos como respuesta en formato JSON.
  });

  app.get("/personajes/publicos", (req, res) => {
  const limit = 5;

  // Aquí debes obtener los últimos 5 personajes públicos desde tu base de datos.
  // Luego, devolverlos como respuesta en formato JSON.
});