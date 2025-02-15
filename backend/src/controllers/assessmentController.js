const db = require('../config/database');

// Function to calculate score level
const calculateScoreLevel = (totalScore) => {
    if (totalScore >= 0 && totalScore <= 3) return 0;
    if (totalScore >= 4 && totalScore <= 7) return 1;
    if (totalScore >= 8 && totalScore <= 11) return 2;
    if (totalScore >= 12 && totalScore <= 15) return 3;
    return 0; // default case
};

// Factory function สำหรับสร้าง controller ของแต่ละประเภทการประเมิน
const createAssessmentController = (tableName) => ({
    // Get all assessments
    getAllAssessments: async (req, res) => {
        try {
            const result = await db.query(`
                WITH score_calc AS (
                    SELECT 
                        a.*,
                        (COALESCE(q1_score, 0) + 
                         COALESCE(q2_score, 0) + 
                         COALESCE(q3_score, 0) + 
                         COALESCE(q4_score, 0) + 
                         COALESCE(q5_score, 0)) as raw_total,
                        h.house_number, 
                        h.village_no, 
                        h.sub_district
                    FROM ${tableName} a
                    LEFT JOIN households h ON a.household_id = h.household_id
                )
                SELECT 
                    *,
                    CASE 
                        WHEN raw_total BETWEEN 0 AND 3 THEN 0
                        WHEN raw_total BETWEEN 4 AND 7 THEN 1
                        WHEN raw_total BETWEEN 8 AND 11 THEN 2
                        WHEN raw_total BETWEEN 12 AND 15 THEN 3
                        ELSE 0
                    END as total_score
                FROM score_calc
                ORDER BY assessment_id DESC
            `);
            res.json(result.rows);
        } catch (err) {
            console.error(`Error in getAll${tableName}:`, err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Get assessments by household ID
    getAssessmentsByHousehold: async (req, res) => {
        try {
            const { householdId } = req.params;
            const result = await db.query(
                `WITH score_calc AS (
                    SELECT 
                        *,
                        (COALESCE(q1_score, 0) + 
                         COALESCE(q2_score, 0) + 
                         COALESCE(q3_score, 0) + 
                         COALESCE(q4_score, 0) + 
                         COALESCE(q5_score, 0)) as raw_total
                    FROM ${tableName}
                    WHERE household_id = $1
                )
                SELECT 
                    *,
                    CASE 
                        WHEN raw_total BETWEEN 0 AND 3 THEN 0
                        WHEN raw_total BETWEEN 4 AND 7 THEN 1
                        WHEN raw_total BETWEEN 8 AND 11 THEN 2
                        WHEN raw_total BETWEEN 12 AND 15 THEN 3
                        ELSE 0
                    END as total_score
                FROM score_calc
                ORDER BY assessment_date DESC`,
                [householdId]
            );
            res.json(result.rows);
        } catch (err) {
            console.error(`Error in get${tableName}ByHousehold:`, err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Get assessment by ID
    getAssessmentById: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await db.query(
                `WITH score_calc AS (
                    SELECT 
                        a.*,
                        (COALESCE(q1_score, 0) + 
                         COALESCE(q2_score, 0) + 
                         COALESCE(q3_score, 0) + 
                         COALESCE(q4_score, 0) + 
                         COALESCE(q5_score, 0)) as raw_total,
                        h.house_number, 
                        h.village_no, 
                        h.sub_district
                    FROM ${tableName} a
                    LEFT JOIN households h ON a.household_id = h.household_id
                    WHERE a.assessment_id = $1
                )
                SELECT 
                    *,
                    CASE 
                        WHEN raw_total BETWEEN 0 AND 3 THEN 0
                        WHEN raw_total BETWEEN 4 AND 7 THEN 1
                        WHEN raw_total BETWEEN 8 AND 11 THEN 2
                        WHEN raw_total BETWEEN 12 AND 15 THEN 3
                        ELSE 0
                    END as total_score
                FROM score_calc`,
                [id]
            );
            
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Assessment not found' });
            }
            
            res.json(result.rows[0]);
        } catch (err) {
            console.error(`Error in get${tableName}ById:`, err);
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
                `WITH inserted AS (
                    INSERT INTO ${tableName} (
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
                    RETURNING *
                )
                SELECT 
                    i.*,
                    CASE 
                        WHEN (COALESCE(q1_score, 0) + COALESCE(q2_score, 0) + 
                              COALESCE(q3_score, 0) + COALESCE(q4_score, 0) + 
                              COALESCE(q5_score, 0)) BETWEEN 0 AND 3 THEN 0
                        WHEN (COALESCE(q1_score, 0) + COALESCE(q2_score, 0) + 
                              COALESCE(q3_score, 0) + COALESCE(q4_score, 0) + 
                              COALESCE(q5_score, 0)) BETWEEN 4 AND 7 THEN 1
                        WHEN (COALESCE(q1_score, 0) + COALESCE(q2_score, 0) + 
                              COALESCE(q3_score, 0) + COALESCE(q4_score, 0) + 
                              COALESCE(q5_score, 0)) BETWEEN 8 AND 11 THEN 2
                        WHEN (COALESCE(q1_score, 0) + COALESCE(q2_score, 0) + 
                              COALESCE(q3_score, 0) + COALESCE(q4_score, 0) + 
                              COALESCE(q5_score, 0)) BETWEEN 12 AND 15 THEN 3
                        ELSE 0
                    END as total_score
                FROM inserted i`,
                [household_id, assessment_date, q1_score, q1_note, q2_score, q2_note,
                 q3_score, q3_note, q4_score, q4_note, q5_score, q5_note]
            );
            
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error(`Error in create${tableName}:`, err);
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
                `WITH updated AS (
                    UPDATE ${tableName} SET
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
                    RETURNING *
                )
                SELECT 
                    u.*,
                    CASE 
                        WHEN (COALESCE(q1_score, 0) + COALESCE(q2_score, 0) + 
                              COALESCE(q3_score, 0) + COALESCE(q4_score, 0) + 
                              COALESCE(q5_score, 0)) BETWEEN 0 AND 3 THEN 0
                        WHEN (COALESCE(q1_score, 0) + COALESCE(q2_score, 0) + 
                              COALESCE(q3_score, 0) + COALESCE(q4_score, 0) + 
                              COALESCE(q5_score, 0)) BETWEEN 4 AND 7 THEN 1
                        WHEN (COALESCE(q1_score, 0) + COALESCE(q2_score, 0) + 
                              COALESCE(q3_score, 0) + COALESCE(q4_score, 0) + 
                              COALESCE(q5_score, 0)) BETWEEN 8 AND 11 THEN 2
                        WHEN (COALESCE(q1_score, 0) + COALESCE(q2_score, 0) + 
                              COALESCE(q3_score, 0) + COALESCE(q4_score, 0) + 
                              COALESCE(q5_score, 0)) BETWEEN 12 AND 15 THEN 3
                        ELSE 0
                    END as total_score
                FROM updated u`,
                [household_id, assessment_date, q1_score, q1_note, q2_score, q2_note,
                 q3_score, q3_note, q4_score, q4_note, q5_score, q5_note, id]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Assessment not found' });
            }

            res.json(result.rows[0]);
        } catch (err) {
            console.error(`Error in update${tableName}:`, err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Delete assessment
    deleteAssessment: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await db.query(
                `DELETE FROM ${tableName} WHERE assessment_id = $1 RETURNING *`,
                [id]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Assessment not found' });
            }

            res.json({ message: `${tableName} deleted successfully` });
        } catch (err) {
            console.error(`Error in delete${tableName}:`, err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

module.exports = createAssessmentController;