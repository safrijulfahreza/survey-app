const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const scheduleController = require('../controllers/scheduleController');

const { loginFieldValidation } = require('../middlewares/fieldValidation');
const { authUserLogin } = require('../middlewares/authToken');

/* GET home page. */
router.get('/schedule', authUserLogin, scheduleController.scheduleWithCustomer);

router.post('/auth', loginFieldValidation, authController);

module.exports = router;
