// Ejemplo de userController.js
const Character = require("../models/character");

exports.getCharacters = async (req, res) => {
  try {
    let filter = {};
    if (req.query.isDefault)
      filter = { ...filter, isDefault: true };

      res.status(200).json(await Character.find(filter));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los personajes." });
  }
};

exports.createCharacter = async (req, res) => {
  try {
    if (Character.schema.validate(req.body).error)
      return res.status(400).json({ message: validationResult.error.details[0].message });

    const nuevoPersonaje = new Character({
      nombre: req.body.nombre,
      face: req.body.face,
      top: req.body.top,
      bottom: req.body.bottom,
      shoes: req.body.shoes,
      createdBy: req.user.id,
      isDefault: req.body.isDefault,
    });

    res.status(201).json(await nuevoPersonaje.save());
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear personaje." });
  }
};

exports.getCharactersFromLast = async (req, res) => {
  try {
    const characters = await Character.find().sort({ createdAt: -1 }).limit(Number(req.query.size));
    res.status(200).json(characters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener personajes" });
  }
};

exports.getCharactersByUser = async (req, res) => {
  try {
    const userId = req.user.id;    
    res.status(200).json(await Character.find({ createdBy: userId }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los personajes." });
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
      return res.status(404).json({ message: "No se encontró el personaje." });    
    else
      res.status(200).json(updatedCharacter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el personajes." });
  }
};