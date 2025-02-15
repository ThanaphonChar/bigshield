const express = require('express');
const router = express.Router();
const respondentController = require('../controllers/respondentController');

router.get('/', respondentController.getAllRespondents);
router.get('/:id', respondentController.getRespondentById);
router.get('/household/:householdId', respondentController.getRespondentsByHousehold);
router.post('/', respondentController.createRespondent);
router.put('/:id', respondentController.updateRespondent);
router.delete('/:id', respondentController.deleteRespondent);

module.exports = router;