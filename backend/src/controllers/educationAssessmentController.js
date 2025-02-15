const db = require('../config/database');

const educationAssessmentController = {
    // Get all education assessments
    getAllAssessments: async (req, res) => {
        try {
            const result = await db.query(`
                SELECT ea.*, h.house_number, h.village_no, h.sub_district
                FROM education_assessment ea
                LEFT JOIN households h ON ea.household_id = h.household_id
                ORDER BY ea.assessment_id DESC`
            );
            res.json(result.rows);
        } catch (err) {
            console.error('Error in getAllEducationAssessments:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Get assessment by household ID
    getAssessmentsByHousehold: async (req, res) => {
        try {
            const { householdId } = req.params;
            const result = await db.query(
                `SELECT * FROM education_assessment 
                WHERE household_id = $1 
                ORDER BY assessment_date DESC`,
                [householdId]
            );
            res.json(result.rows);
        } catch (err) {
            console.error('Error in getEducationAssessmentsByHousehold:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Get assessment by ID
    getAssessmentById: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await db.query(
                `SELECT ea.*, h.house_number, h.village_no, h.sub_district
                FROM education_assessment ea
                LEFT JOIN households h ON ea.household_id = h.household_id
                WHERE ea.assessment_id = $1`,
                [id]
            );
            
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Assessment not found' });
            }
            
            res.json(result.rows[0]);
        } catch (err) {
            console.error('Error in getEducationAssessmentById:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Create new assessment
    createAssessment: async (req, res) => {
        try {
            const {
                household_id,
                assessment_date,
                q1_score,
                q1_note,
                q2_score,
                q2_note,
                q3_score,
                q3_note,
                q4_score,
                q4_note,
                q5_score,
                q5_note
            } = req.body;

            // Validate if household exists
            const householdExists = await db.query(
                'SELECT household_id FROM households WHERE household_id = $1',
                [household_id]
            );

            if (householdExists.rows.length === 0) {
                return res.status(400).json({ message: 'Household does not exist' });
            }

            const result = await db.query(
                `INSERT INTO education_assessment (
                    household_id,
                    assessment_date,
                    q1_score,
                    q1_note,
                    q2_score,
                    q2_note,
                    q3_score,
                    q3_note,
                    q4_score,
                    q4_note,
                    q5_score,
                    q5_note
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                RETURNING *`,
                [household_id, assessment_date, q1_score, q1_note, q2_score, q2_note,
                 q3_score, q3_note, q4_score, q4_note, q5_score, q5_note]
            );
            
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error('Error in createEducationAssessment:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Update assessment
    updateAssessment: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                household_id,
                assessment_date,
                q1_score,
                q1_note,
                q2_score,
                q2_note,
                q3_score,
                q3_note,
                q4_score,
                q4_note,
                q5_score,
                q5_note
            } = req.body;

            // Validate if household exists if household_id is provided
            if (household_id) {
                const householdExists = await db.query(
                    'SELECT household_id FROM households WHERE household_id = $1',
                    [household_id]
                );

                if (householdExists.rows.length === 0) {
                    return res.status(400).json({ message: 'Household does not exist' });
                }
            }

            const result = await db.query(
                `UPDATE education_assessment SET
                    household_id = $1,
                    assessment_date = $2,
                    q1_score = $3,
                    q1_note = $4,
                    q2_score = $5,
                    q2_note = $6,
                    q3_score = $7,
                    q3_note = $8,
                    q4_score = $9,
                    q4_note = $10,
                    q5_score = $11,
                    q5_note = $12
                WHERE assessment_id = $13
                RETURNING *`,
                [household_id, assessment_date, q1_score, q1_note, q2_score, q2_note,
                 q3_score, q3_note, q4_score, q4_note, q5_score, q5_note, id]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Assessment not found' });
            }

            res.json(result.rows[0]);
        } catch (err) {
            console.error('Error in updateEducationAssessment:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Delete assessment
    deleteAssessment: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await db.query(
                'DELETE FROM education_assessment WHERE assessment_id = $1 RETURNING *',
                [id]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Assessment not found' });
            }

            res.json({ message: 'Education assessment deleted successfully' });
        } catch (err) {
            console.error('Error in deleteEducationAssessment:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = educationAssessmentController;