// assessmentSummaryRoutes.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const assessmentSummaryController = require('../controllers/assessmentSummaryController');

// Validation middleware
const validateSummary = [
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
    
    body([
        'education_score',
        'family_score',
        'health_score',
        'housing_score',
        'income_score',
        'justice_score',
        'security_score',
        'social_score'
    ])
        .optional()
        .isInt({ min: 0, max: 15 })
        .withMessage('Score must be between 0 and 15')
];

// Get all summaries
router.get('/', assessmentSummaryController.getAllSummaries);

// Get summary by household ID
router.get('/household/:householdId', assessmentSummaryController.getSummaryByHousehold);

// Get household statistics
router.get('/household/:householdId/statistics', assessmentSummaryController.getHouseholdStatistics);

module.exports = router;