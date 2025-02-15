const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const educationAssessmentController = require('../controllers/educationAssessmentController');

// Validation middleware
const validateAssessment = [
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
    
    body(['q1_score', 'q2_score', 'q3_score', 'q4_score', 'q5_score'])
        .optional()
        .isInt({ min: 0, max: 3 })
        .withMessage('Score must be between 0 and 3'),
    
    body(['q1_note', 'q2_note', 'q3_note', 'q4_note', 'q5_note'])
        .optional()
        .isString()
        .trim()
];

// Routes
router.get('/', educationAssessmentController.getAllAssessments);
router.get('/household/:householdId', educationAssessmentController.getAssessmentsByHousehold);
router.get('/:id', educationAssessmentController.getAssessmentById);
router.post('/', validateAssessment, educationAssessmentController.createAssessment);
router.put('/:id', validateAssessment, educationAssessmentController.updateAssessment);
router.delete('/:id', educationAssessmentController.deleteAssessment);

module.exports = router;