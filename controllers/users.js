const User = require("../models/users");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({data: users, hasError: false});
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: "Error al cargar usuarios.", hasError: true});
  } 
};

exports.createUsers = async (req, res) => {    
    if (!req.body.name || !req.body.lastname || !req.body.email || !req.body.isActive || !req.body.password || !req.body.username)
      return res.status(400).json({ data: 'Todos los campos requeridos deben ser proporcionados', hasError: true});

    const userName = req.body.username;
    const email = req.body.email;

    if (await User.findOne({ $or: [{ userName }, { email }] }))
      return res.status(409).send({data: "El usuario ya existe", hasError: true});
  
    const userToCreate = new User({
      email: email,
      userName: userName,
      name: req.body.name,
      lastname: req.body.lastname,
      fullName: req.body.fullName,
      isActive: req.body.isActive,
      password: require("crypto").createHash("sha256").update(req.body.password.toString()).digest("hex"),
    });

    try{
      let user = await userToCreate.save();
      console.log(user);

      res.status(201).send({data: user, hasError: false});
    }
    catch(error){
      res.status(500).send({data: "Error. Intente más tarde.", hasError: true});
    }
  };