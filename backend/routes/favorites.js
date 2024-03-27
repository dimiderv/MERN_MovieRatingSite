const express= require('express');
const router= express.Router();

const favoritesController = require('../controllers/favoritesController');

const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT)

router.route('/')
    .get(favoritesController.getFavorites)
    .post(favoritesController.postFavorites)
    .delete(favoritesController.deleteFavorites)


module.exports = router