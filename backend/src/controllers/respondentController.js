const db = require('../config/database');

const respondentController = {
    // Get all respondents
    getAllRespondents: async (req, res) => {
        try {
            const result = await db.query(`
                SELECT 
                    r.*,
                    h.house_number,
                    h.village_no,
                    h.sub_district,
                    h.district,
                    h.province
                FROM respondents r
                LEFT JOIN households h ON r.household_id = h.household_id
                ORDER BY r.respondent_id DESC
            `);
            res.json(result.rows);
        } catch (err) {
            console.error('Error in getAllRespondents:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Get respondent by ID
    getRespondentById: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await db.query(`
                SELECT 
                    r.*,
                    h.house_number,
                    h.village_no,
                    h.sub_district,
                    h.district,
                    h.province
                FROM respondents r
                LEFT JOIN households h ON r.household_id = h.household_id
                WHERE r.respondent_id = $1
            `, [id]);

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Respondent not found' });
            }

            res.json(result.rows[0]);
        } catch (err) {
            console.error('Error in getRespondentById:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Get respondents by household
    getRespondentsByHousehold: async (req, res) => {
        const { householdId } = req.params;
        try {
            const result = await db.query(
                'SELECT * FROM respondents WHERE household_id = $1',
                [householdId]
            );
            res.json(result.rows);
        } catch (err) {
            console.error('Error in getRespondentsByHousehold:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Create new respondent
    createRespondent: async (req, res) => {
        try {
            const {
                household_id,
                first_last_name,
                national_id,
                birth_date,
                age,
                gender,
                phone,
                mobile_phone
            } = req.body;

            const result = await db.query(
                `INSERT INTO respondents (
                    household_id, first_last_name, national_id,
                    birth_date, age, gender, phone, mobile_phone
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *`,
                [
                    household_id, first_last_name, national_id,
                    birth_date, age, gender, phone, mobile_phone
                ]
            );
            
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error('Error in createRespondent:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Update respondent
    updateRespondent: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                household_id,
                first_last_name,
                national_id,
                birth_date,
                age,
                gender,
                phone,
                mobile_phone
            } = req.body;

            const result = await db.query(
                `UPDATE respondents SET
                    household_id = $1,
                    first_last_name = $2,
                    national_id = $3,
                    birth_date = $4,
                    age = $5,
                    gender = $6,
                    phone = $7,
                    mobile_phone = $8,
                    updated_at = CURRENT_TIMESTAMP
                WHERE respondent_id = $9
                RETURNING *`,
                [
                    household_id, first_last_name, national_id,
                    birth_date, age, gender, phone, mobile_phone, id
                ]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Respondent not found' });
            }

            res.json(result.rows[0]);
        } catch (err) {
            console.error('Error in updateRespondent:', err);
            if (err.code === '23505') {
                res.status(400).json({ error: 'National ID already exists' });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    },

    // Delete respondent
    deleteRespondent: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await db.query(
                'DELETE FROM respondents WHERE respondent_id = $1 RETURNING *',
                [id]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Respondent not found' });
            }

            res.json({ message: 'Respondent deleted successfully' });
        } catch (err) {
            console.error('Error in deleteRespondent:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = respondentController;