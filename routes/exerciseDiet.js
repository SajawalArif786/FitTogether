const express = require('express');
const { body, param } = require('express-validator');

//Middlewares

const validatorMiddleware = require('../middleware/Validator-MiddleWare');
const Authentication = require('../middleware/authentication')
const upload = require('../middleware/multer');

//Router
const router = express.Router()

//Controllers
const { getDailyPlans } = require('../controllers/exercise&Diet/getDailyPlans')

router.get('/getDailyPlans', Authentication , getDailyPlans)

module.exports = router