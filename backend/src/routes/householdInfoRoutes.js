const express = require('express');
const router = express.Router();
const householdInfoController = require('../controllers/householdInfoController');

router.get('/', householdInfoController.getAllHouseholdInfo);
router.get('/:id', householdInfoController.getHouseholdInfoById);
router.get('/household/:householdId', householdInfoController.getHouseholdInfoByHouseholdId);
router.post('/', householdInfoController.createHouseholdInfo);
router.put('/:id', householdInfoController.updateHouseholdInfo);
router.delete('/:id', householdInfoController.deleteHouseholdInfo);

module.exports = router;