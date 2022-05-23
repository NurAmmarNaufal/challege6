const express = require("express");
const { gameController } = require("../controllers");
const gameRouter = express.Router();

// gameRouter.get('/', (req, res) => res.send('Game World'));

// "/dataGamer/...."

gameRouter.get("/login", gameController.loginForm);
gameRouter.post("/login/check", gameController.check);
gameRouter.post("/addGame", gameController.createGame);
gameRouter.get("/viewGame", gameController.viewGame); //home
gameRouter.get("/editGame/:id", gameController.viewFormEdit);
gameRouter.post("/updateGame/:id", gameController.updateGame);
gameRouter.get("/addForm", gameController.formCreate);
gameRouter.get("/deleteGame/:id", gameController.deleteGame);

module.exports = gameRouter;
// module.exports = router;