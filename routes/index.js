const express = require ('express');
const router = express.Router();
const path = require('path')
const usersValidation = require (path.resolve('./middlewares/usersValidation'))
const mainController = require (path.resolve('./src/controllers/mainController'))

/* GET home page. */
router.get('/', mainController.register );
router.post('/',usersValidation, mainController.create );


module.exports = router;
