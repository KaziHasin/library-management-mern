const express = require('express');
const router = express.Router();
const getCategory = require('../controllers/CategoryController');

router.route('/').get(getCategory);

module.exports = router;
