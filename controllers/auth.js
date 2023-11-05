require("mongoose");
const Usr = require("../models/users");
const webJwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;

const login = async (req, res) => {    
    const password = req.body.password;

    if (!req.body.email)
        res.status(401).send("Complete el mail");
    else if (!password)
        res.status(401).send("Complete la contraseña.");        
    else {
        const existingUser = await Usr.findOne({
            email: req.body.email,
            isActive: true,
            password: require("crypto").createHash("sha256").update(password).digest("hex"),
        });

        if (existingUser)
            res.status(200).json(webJwt.sign({ user: existingUser }, secret_key, { expiresIn: "1d" }));
        else
            res.status(401).send("Usuario no encontrado.");
    }
};

module.exports = { login };