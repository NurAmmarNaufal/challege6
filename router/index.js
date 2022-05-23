const express = require("express");
const router = express.Router();
const gameRouter = require("./gameRouter");


router.get('/', (req, res) => res.send('server is running'));
router.use('/dataGamer', gameRouter);
module.exports = router;