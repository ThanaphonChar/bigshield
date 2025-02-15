const express = require('express');
const { body } = require('express-validator');

// Validation middleware สำหรับทุกการประเมิน
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

// Helper function สร้าง routes สำหรับแต่ละประเภทการประเมิน
const createAssessmentRoutes = (router, controller, validateAssessment) => {
    router.get('/', controller.getAllAssessments);
    router.get('/household/:householdId', controller.getAssessmentsByHousehold);
    router.get('/:id', controller.getAssessmentById);
    router.post('/', validateAssessment, controller.createAssessment);
    router.put('/:id', validateAssessment, controller.updateAssessment);
    router.delete('/:id', controller.deleteAssessment);
    return router;
};

module.exports = {
    validateAssessment,
    createAssessmentRoutes
};