const db = require('../config/database');

const householdInfoController = {
    // Get all household info
    getAllHouseholdInfo: async (req, res) => {
        try {
            const result = await db.query(`
                SELECT hi.*, h.house_number, h.village_no 
                FROM household_information hi
                LEFT JOIN households h ON h.household_id = hi.household_id
                ORDER BY hi.id DESC
            `);
            res.json(result.rows);
        } catch (err) {
            console.error('Error in getAllHouseholdInfo:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Get household info by ID
    getHouseholdInfoById: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await db.query(
                'SELECT * FROM household_information WHERE id = $1',
                [id]
            );
            
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Household information not found' });
            }
            
            res.json(result.rows[0]);
        } catch (err) {
            console.error('Error in getHouseholdInfoById:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Get household info by household ID
    getHouseholdInfoByHouseholdId: async (req, res) => {
        try {
            const { householdId } = req.params;
            const result = await db.query(
                'SELECT * FROM household_information WHERE household_id = $1',
                [householdId]
            );
            
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Household information not found' });
            }
            
            res.json(result.rows[0]);
        } catch (err) {
            console.error('Error in getHouseholdInfoByHouseholdId:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Create new household info
    createHouseholdInfo: async (req, res) => {
        try {
            const {
                household_id,
                residence_status,
                rental_type,
                additional_details
            } = req.body;

            const result = await db.query(
                `INSERT INTO household_information (
                    household_id,
                    residence_status,
                    rental_type,
                    additional_details
                ) VALUES ($1, $2, $3, $4)
                RETURNING *`,
                [household_id, residence_status, rental_type, additional_details]
            );
            
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error('Error in createHouseholdInfo:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Update household info
    updateHouseholdInfo: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                residence_status,
                rental_type,
                additional_details
            } = req.body;

            const result = await db.query(
                `UPDATE household_information SET
                    residence_status = $1,
                    rental_type = $2,
                    additional_details = $3,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $4
                RETURNING *`,
                [residence_status, rental_type, additional_details, id]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Household information not found' });
            }

            res.json(result.rows[0]);
        } catch (err) {
            console.error('Error in updateHouseholdInfo:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Delete household info
    deleteHouseholdInfo: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await db.query(
                'DELETE FROM household_information WHERE id = $1 RETURNING *',
                [id]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Household information not found' });
            }

            res.json({ message: 'Household information deleted successfully' });
        } catch (err) {
            console.error('Error in deleteHouseholdInfo:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = householdInfoController;