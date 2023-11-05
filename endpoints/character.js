const express = require("express");
const router = express.Router();
const userCharacter = require("../controllers/character");
const Middleware = require("../middleware/auth-middleware");

router.get("/character/last", userCharacter.getCharactersFromLast);
router.get("/character", Middleware.verify, userCharacter.getCharacters);
router.post("/character", Middleware.verify, userCharacter.createCharacter);
router.put("/character/:id", Middleware.verify, userCharacter.updateCharacter);
router.get("/character/byUser", Middleware.verify, userCharacter.getCharactersByUser);

module.exports = router;