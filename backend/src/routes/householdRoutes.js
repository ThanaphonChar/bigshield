const express = require('express');
const router = express.Router();
const householdController = require('../controllers/householdController');  // แก้จาก householdInfoController

router.get('/', householdController.getAllHouseholds);
router.get('/:id', householdController.getHouseholdById);
router.post('/', householdController.createHousehold);
router.put('/:id', householdController.updateHousehold);
router.delete('/:id', householdController.deleteHousehold);

module.exports = router;