const db = require('../config/database');

const personController = {
    // Get all persons with household info
    getAllPersons: async (req, res) => {
        try {
            const result = await db.query(`
                SELECT p.*, h.house_number, h.village_no, h.sub_district, h.district, h.province 
                FROM persons p
                LEFT JOIN households h ON p.household_id = h.household_id
                ORDER BY p.person_id DESC
            `);
            res.json(result.rows);
        } catch (err) {
            console.error('Error in getAllPersons:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Get persons by household ID
    getPersonsByHousehold: async (req, res) => {
        try {
            const { householdId } = req.params;
            const result = await db.query(
                'SELECT * FROM persons WHERE household_id = $1 ORDER BY person_id',
                [householdId]
            );
            res.json(result.rows);
        } catch (err) {
            console.error('Error in getPersonsByHousehold:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Get person by ID
    getPersonById: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await db.query(`
                SELECT p.*, h.house_number, h.village_no, h.sub_district, h.district, h.province 
                FROM persons p
                LEFT JOIN households h ON p.household_id = h.household_id
                WHERE p.person_id = $1
            `, [id]);
            
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Person not found' });
            }
            
            res.json(result.rows[0]);
        } catch (err) {
            console.error('Error in getPersonById:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Create new person
    createPerson: async (req, res) => {
        try {
            const {
                household_id,
                national_id,
                no_national_id_reason,
                title,
                first_name,
                last_name,
                birth_date,
                gender,
                relationship,
                education_level,
                phone,
                mobile_phone,
                occupation,
                monthly_income,
                physical_status,
                self_care,
                is_respondent
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
                `INSERT INTO persons (
                    household_id, national_id, no_national_id_reason, title,
                    first_name, last_name, birth_date, gender, relationship,
                    education_level, phone, mobile_phone, occupation,
                    monthly_income, physical_status, self_care, is_respondent
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
                RETURNING *`,
                [
                    household_id, national_id, no_national_id_reason, title,
                    first_name, last_name, birth_date, gender, relationship,
                    education_level, phone, mobile_phone, occupation,
                    monthly_income, physical_status, self_care, is_respondent
                ]
            );
            
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error('Error in createPerson:', err);
            if (err.code === '23505') { // unique violation
                res.status(400).json({ error: 'National ID already exists' });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    },

    // Update person
    updatePerson: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                household_id,
                national_id,
                no_national_id_reason,
                title,
                first_name,
                last_name,
                birth_date,
                gender,
                relationship,
                education_level,
                phone,
                mobile_phone,
                occupation,
                monthly_income,
                physical_status,
                self_care,
                is_respondent
            } = req.body;

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
                `UPDATE persons SET
                    household_id = $1,
                    national_id = $2,
                    no_national_id_reason = $3,
                    title = $4,
                    first_name = $5,
                    last_name = $6,
                    birth_date = $7,
                    gender = $8,
                    relationship = $9,
                    education_level = $10,
                    phone = $11,
                    mobile_phone = $12,
                    occupation = $13,
                    monthly_income = $14,
                    physical_status = $15,
                    self_care = $16,
                    is_respondent = $17
                WHERE person_id = $18
                RETURNING *`,
                [
                    household_id, national_id, no_national_id_reason, title,
                    first_name, last_name, birth_date, gender, relationship,
                    education_level, phone, mobile_phone, occupation,
                    monthly_income, physical_status, self_care, is_respondent,
                    id
                ]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Person not found' });
            }

            res.json(result.rows[0]);
        } catch (err) {
            console.error('Error in updatePerson:', err);
            if (err.code === '23505') {
                res.status(400).json({ error: 'National ID already exists' });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    },

    // Delete person
    deletePerson: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await db.query(
                'DELETE FROM persons WHERE person_id = $1 RETURNING *',
                [id]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Person not found' });
            }

            res.json({ message: 'Person deleted successfully' });
        } catch (err) {
            console.error('Error in deletePerson:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = personController;