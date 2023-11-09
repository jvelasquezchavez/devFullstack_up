const Character = require("../models/character");
const User = require("../models/users");

exports.getCharacters = async (req, res) => {
  try {
    let filter = {};
    if (req.query.isDefault)
      filter = { ...filter, isDefault: true };

      res.status(200).json({data: await Character.find(filter), hasError: false});
  } catch (error) {
    console.error(error);
    res.status(500).json({data: "Error al obtener los personajes.", hasError: true});
  }
};

exports.createCharacter = async (req, res) => {
  try {
    if (!req.body.name || !req.body.face || !req.body.top || !req.body.bottom || !req.body.shoes)
       return res.status(400).json({ message: "Faltan parametros para crear el personaje", hasError: true});

    const nuevoPersonaje = new Character({
      name: req.body.name,
      face: req.body.face,
      top: req.body.top,
      bottom: req.body.bottom,
      shoes: req.body.shoes,
      createdBy: req.user.id,
      isDefault: req.body.isDefault,
    });

    res.status(201).json({data: await nuevoPersonaje.save(), hasError: false});
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: "Error al crear personaje.", hasError: true});
  }
};

exports.getCharactersFromLast = async (req, res) => {
  try {
    const characters = await Character.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json({data: characters, hasError: false});
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: "Error al obtener personajes", hasError: true });
  }
};

exports.getCharactersByUser = async (req, res) => {
  try {
    let filter = {};
    filter = { ...filter, createdBy: req.user.id };
    res.status(200).json({data: await Character.find(filter), hasError: false});
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: "Error al obtener los personajes.", hasError: true });
  }
};

exports.updateCharacter = async (req, res) => {
  try {
    const updates = req.body;
    updates.updatedBy = req.user.id;

    const updatedCharacter = await Character.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!updatedCharacter)
      return res.status(404).json({ data: "No se encontró el personaje.", hasError: true  });    
    else
      res.status(200).json({data: updatedCharacter, hasError: false});
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: "Error al actualizar el personajes.", hasError: true });
  }
};