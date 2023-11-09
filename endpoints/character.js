const express = require("express");
const router = express.Router();
const userCharacter = require("../controllers/character");
const Middleware = require("../middleware/auth-middleware");

router.get("/character/last", userCharacter.getCharactersFromLast);
router.get("/character", Middleware.authenticationMiddleware, userCharacter.getCharacters);
router.post("/character", Middleware.authenticationMiddleware, userCharacter.createCharacter);
router.put("/character/:id", Middleware.authenticationMiddleware, userCharacter.updateCharacter);
router.get("/character/byUser", Middleware.authenticationMiddleware, userCharacter.getCharactersByUser);

module.exports = router;