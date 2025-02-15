const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const householdSocialWelfareController = require('../controllers/householdSocialWelfareController');

// Validation middleware
const validateWelfare = [
    body('household_id')
        .notEmpty()
        .withMessage('Household ID is required')
        .isInt()
        .withMessage('Household ID must be an integer'),
    
    body('assessment_date')
        .notEmpty()
        .withMessage('Assessment date is required')
        .isISO8601()
        .withMessage('Invalid date format'),
    
    // Boolean fields validation
    body([
        'child_benefit', 'child_social_security', 'child_poverty',
        'child_foster', 'child_protection_fund', 'child_council',
        'elderly_allowance', 'elderly_fund', 'elderly_support',
        'elderly_funeral', 'elderly_housing', 'elderly_care_center',
        'elderly_school', 'disabled_card', 'disabled_allowance',
        'disabled_loan', 'disabled_housing', 'disabled_employment',
        'disabled_assistant', 'bedridden_rehabilitation',
        'bedridden_ltc', 'bedridden_transport', 'women_oscc',
        'women_family_support', 'women_fund', 'women_group',
        'aids_allowance', 'veteran_pension', 'veteran_family_support_1',
        'veteran_support_234', 'veteran_visit', 'public_healthcare',
        'public_social_security', 'public_vocational',
        'public_education', 'public_nsf'
    ])
        .optional()
        .isBoolean()
        .withMessage('Must be a boolean value')
];

// Routes
router.get('/', householdSocialWelfareController.getAllWelfare);
router.get('/household/:householdId', householdSocialWelfareController.getWelfareByHousehold);
router.get('/:id', householdSocialWelfareController.getWelfareById);
router.post('/', validateWelfare, householdSocialWelfareController.createWelfare);
router.put('/:id', validateWelfare, householdSocialWelfareController.updateWelfare);
router.delete('/:id', householdSocialWelfareController.deleteWelfare);

module.exports = router;