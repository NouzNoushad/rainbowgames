const express = require('express');

const router = express.Router();

//controllers
const game = require('../controllers/gameController.js');
const snakeGame = require('../controllers/snakeController.js');
const pingpongGame = require('../controllers/pingpongController.js');
const ballfallGame = require('../controllers/ballfallController.js');

router.get('/', game);

router.get('/snake', snakeGame);

router.get('/pingpong', pingpongGame);

router.get('/ballfall', ballfallGame);

module.exports = router;