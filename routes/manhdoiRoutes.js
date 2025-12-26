const express = require('express');
const router = express.Router();
const manhdoiController = require('../controller/manhdoi.controller');
router.get('/:cccd', manhdoiController.getManhDoiByCccd);

module.exports = router;