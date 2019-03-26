// lib/routes/api/v1/favorites.js
const express = require('express');
const router = express.Router();
const favoritesController = require('../../../controllers/favorites_controller.js');

router.get('/', favoritesController.index);

module.exports = router
