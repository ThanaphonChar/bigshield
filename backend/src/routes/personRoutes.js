const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const personController = require('../controllers/personController');

// Validation middleware
const validatePerson = [
    body('household_id')
        .notEmpty()
        .withMessage('Household ID is required'),
    
    body('first_name')
        .notEmpty()
        .withMessage('First name is required'),
    
    body('last_name')
        .notEmpty()
        .withMessage('Last name is required'),
    
    body('national_id')
        .optional()
        .isLength({ min: 13, max: 13 })
        .withMessage('National ID must be 13 digits'),
    
    body('birth_date')
        .optional()
        .isISO8601()
        .withMessage('Invalid date format'),
    
    body('gender')
        .optional()
        .isIn(['male', 'female', 'other'])
        .withMessage('Invalid gender'),
    
    body('monthly_income')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Monthly income must be a positive number'),
    
    body('physical_status')
        .optional()
        .isIn(['normal', 'disabled', 'chronically_ill', 'bedridden'])
        .withMessage('Invalid physical status'),

    body('is_respondent')
        .optional()
        .isString()
        .isLength({ max: 150 })
        .withMessage('Respondent status must be a string not exceeding 150 characters'),
    
    body('self_care')
        .optional()
        .isBoolean()
        .withMessage('Self care must be a boolean value')
];

// Routes
router.get('/', personController.getAllPersons);
router.get('/household/:householdId', personController.getPersonsByHousehold);
router.get('/:id', personController.getPersonById);
router.post('/', validatePerson, personController.createPerson);
router.put('/:id', validatePerson, personController.updatePerson);
router.delete('/:id', personController.deletePerson);

module.exports = router;