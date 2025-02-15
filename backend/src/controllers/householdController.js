const db = require('../config/database');

const householdController = {
    // Get all households
    getAllHouseholds: async (req, res) => {
        try {
            const result = await db.query(`
                SELECT h.*, 
                    COUNT(DISTINCT p.person_id) as total_residents,
                    r.first_last_name as respondent_name
                FROM households h
                LEFT JOIN persons p ON h.household_id = p.household_id
                LEFT JOIN respondents r ON h.household_id = r.household_id
                GROUP BY h.household_id, r.first_last_name
                ORDER BY h.household_id DESC`
            );
            res.json(result.rows);
        } catch (err) {
            console.error('Error in getAllHouseholds:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Get household by ID
    getHouseholdById: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await db.query(
                'SELECT * FROM households WHERE household_id = $1',
                [id]
            );
            
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Household not found' });
            }
            
            res.json(result.rows[0]);
        } catch (err) {
            console.error('Error in getHouseholdById:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Create new household
    createHousehold: async (req, res) => {
        try {
            const {
                house_number,
                village_no,
                sub_district,
                district,
                province,
                postal_code,
                housing_type
            } = req.body;

            const result = await db.query(
                `INSERT INTO households (
                    house_number, village_no, sub_district,
                    district, province, postal_code, housing_type
                ) VALUES ($1, $2, $3, $4, $5, $6, $7) 
                RETURNING *`,
                [house_number, village_no, sub_district,
                 district, province, postal_code, housing_type]
            );
            
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error('Error in createHousehold:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Update household
    updateHousehold: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                house_number,
                village_no,
                sub_district,
                district,
                province,
                postal_code,
                housing_type
            } = req.body;

            const result = await db.query(
                `UPDATE households SET
                    house_number = $1,
                    village_no = $2,
                    sub_district = $3,
                    district = $4,
                    province = $5,
                    postal_code = $6,
                    housing_type = $7,
                    updated_at = CURRENT_TIMESTAMP
                WHERE household_id = $8
                RETURNING *`,
                [house_number, village_no, sub_district,
                 district, province, postal_code, housing_type, id]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Household not found' });
            }

            res.json(result.rows[0]);
        } catch (err) {
            console.error('Error in updateHousehold:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Delete household
    deleteHousehold: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await db.query(
                'DELETE FROM households WHERE household_id = $1 RETURNING *',
                [id]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Household not found' });
            }

            res.json({ message: 'Household deleted successfully' });
        } catch (err) {
            console.error('Error in deleteHousehold:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = householdController;